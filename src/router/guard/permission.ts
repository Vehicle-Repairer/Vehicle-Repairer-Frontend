import type {NavigationGuardNext, RouteLocationNormalized, Router} from 'vue-router';
import {routeName} from '@/router';
import {exeStrategyActions, storage} from '@/utils';
import {createDynamicRouteGuard} from './dynamic';
import {LoadingBarApi} from "naive-ui";
import {useStore} from "@/stores/store";
import {nextTick} from "vue";

declare const window: Window & { $message: any; $loadingBar: LoadingBarApi };


export async function createPermissionGuard(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext,
    router: Router
) {
    const permission = await createDynamicRouteGuard(to, from, next, router);
    const store = useStore();
    store.role = '';
    await nextTick(() => {
        store.role = storage.get('role');
    })
    store.role = storage.get('role');
    if (!permission) return;
    if (to.meta.href) {
        window.open(to.meta.href);
        next({path: from.fullPath, replace: true, query: from.query});
        return;
    }
    const token = storage.get('token');
    const myRole = storage.get('role');
    const needLogin = Boolean(to.meta?.requiresAuth);
    const toRole = to.meta?.role;
    const actions: Common.StrategyAction[] = [
        [
            (to.name === routeName('login') && token != null),
            () => {
                next({name: routeName('root')});
            }
        ],
        [
            !needLogin,
            () => {
                next();
            }
        ],
        [
            token == null && needLogin,
            () => {
                const redirect = to.fullPath;
                next({name: routeName('login'), query: {redirect}});
            }
        ],
        [
            myRole == toRole,
            () => {
                next();
            }
        ],
        [
            myRole != toRole && toRole != null,
            () => {
                if (window.$message) {
                    window.$message.error('您没有权限访问该页面');
                }
                next({name: routeName('root')});
            }
        ],
        [
            token != null && needLogin,
            () => {
                next();
            }
        ],
    ];
    exeStrategyActions(actions);
}

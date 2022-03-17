export const sidebarRoutes: AuthRoute.Route[] = [
    {
        name: 'dashboard',
        path: '/dashboard',
        component: 'self',
        meta: {
            title: '控制台',
            icon: 'mdi:cards-spade',
            requiresAuth: true,
            singleLayout: 'basic' // 作为单级路由的父级路由布局组件
        }
    },
    {
        name: 'workbench',
        path: '/workbench',
        component: 'self',
        meta: {
            title: '工作台',
            icon: 'mdi:cards-heart-outline',
            requiresAuth: true,
            singleLayout: 'basic' // 作为单级路由的父级路由布局组件
        }
    }
];

/** 固定的路由 */
export const constantRoutes: AuthRoute.Route[] = [
    {
        name: 'root',
        path: '/',
        redirect: '/dashboard',
        meta: {
            title: '工作台'
        }
    },
    {
        name: 'login',
        path: '/login',
        component: 'self',
        meta: {
            title: '登录'
        }
    },
    {
        name: 'active-account',
        path: '/active-account',
        component: 'self',
        meta: {
            title: '激活账户'
        }
    },
    {
        name: 'no-permission',
        path: '/no-permission',
        component: 'self',
        meta: {
            title: '无权限',
            singleLayout: 'blank'
        }
    },
    {
        name: 'not-found',
        path: '/not-found',
        component: 'self',
        meta: {
            title: '未找到',
            singleLayout: 'blank'
        }
    },
    {
        name: 'service-error',
        path: '/service-error',
        component: 'self',
        meta: {
            title: '服务器错误',
            singleLayout: 'blank'
        }
    },
    {
        name: 'not-found-page',
        path: '/:pathMatch(.*)*',
        component: 'blank',
        meta: {
            title: '未找到!',
            singleLayout: 'blank'
        }
    },
    ...sidebarRoutes
];

/** 路由名称 */
export const routeName = (key: AuthRoute.RouteKey) => key;

/** 路由路径 */
export function routePath(key: Exclude<AuthRoute.RouteKey, 'not-found-page'>): AuthRoute.RoutePath {
    const rootPath: AuthRoute.RoutePath = '/';
    if (key === 'root') return rootPath;
    const splitMark: AuthRoute.RouteSplitMark = '_';
    const pathSplitMark = '/';
    const path = key.split(splitMark).join(pathSplitMark);
    return (pathSplitMark + path) as AuthRoute.RoutePath;
}

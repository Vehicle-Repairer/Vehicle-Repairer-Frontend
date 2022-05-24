export const sidebarRoutes: AuthRoute.Route[] = [
    {
        name: 'home',
        path: '/home',
        component: 'self',
        meta: {
            title: '主页',
            icon: 'mdi:clipboard-account',
            requiresAuth: true,
            singleLayout: 'basic'
        }
    },
    {
        name:'test',
        path: '/test',
        component: 'self',
        meta: {
            title: '测试',
            icon: 'ion:logo-alipay',
            requiresAuth: true,
            singleLayout: 'basic'
        }
    },
    {
        name:'registerCustomer',
        path: '/registerCustomer',
        component: 'self',
        meta: {
            title: '登记客户',
            icon: 'entypo:add-to-list',
            requiresAuth: true,
            singleLayout: 'basic',
            role: '业务员'
        }
    },
    {
        name:'registerCar',
        path: '/registerCar',
        component: 'self',
        meta: {
            title: '登记车辆',
            icon: 'clarity:media-changer-outline-alerted',
            requiresAuth: true,
            singleLayout: 'basic',
            role: '业务员'
        }
    },
    {
        name:'generateOrder',
        path: '/generateOrder',
        component: 'self',
        meta: {
            title: '维修委托',
            icon: 'clarity:media-changer-outline-alerted',
            requiresAuth: true,
            singleLayout: 'basic',
            role: '业务员'
        }
    },
    {
        name:'repairAssign',
        path: '/repairAssign',
        component: 'self',
        meta: {
            title: '维修派工单',
            icon: 'clarity:media-changer-outline-alerted',
            requiresAuth: true,
            singleLayout: 'basic',
            role: '业务员'
        }
    },
    {
        name:'repairPrice',
        path: '/repairPrice',
        component: 'self',
        meta: {
            title: '维修总价',
            icon: 'clarity:media-changer-outline-alerted',
            requiresAuth: true,
            singleLayout: 'basic',
            role: '业务员'
        }
    },
    {
        name:'myWorkOrder',
        path: '/myWorkOrder',
        component: 'self',
        meta: {
            title: '我的工单',
            icon: 'clarity:media-changer-outline-alerted',
            requiresAuth: true,
            singleLayout: 'basic',
            role: '维修员'
        }
    },
    {
        name:'registerMaterial',
        path: '/registerMaterial',
        component: 'self',
        meta: {
            title: '登记材料',
            icon: 'material-symbols:content-paste-search',
            requiresAuth: true,
            singleLayout: 'basic',
            role: '维修员'
        }
    },
    {
        name:'selectWorkOrder',
        path: '/selectWorkOrder',
        component: 'self',
        meta: {
            title: '查询工单',
            icon: 'material-symbols:content-paste-search',
            requiresAuth: true,
            singleLayout: 'basic',
            role: '维修员'
        }
    },
];

/** 固定的路由 */
export const constantRoutes: AuthRoute.Route[] = [
    {
        name: 'root',
        path: '/',
        redirect: '/home',
        meta: {
            title: '主页'
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
        name: 'active',
        path: '/active',
        component: 'self',
        meta: {
            title: '激活'
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
    // 匹配无效路径的路由
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

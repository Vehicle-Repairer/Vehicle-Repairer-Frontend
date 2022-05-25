export const sidebarRoutes: AuthRoute.Route[] = [
    {
        name: 'home',
        path: '/home',
        component: 'self',
        meta: {
            title: '主页',
            icon: 'material-symbols:home',
            requiresAuth: true,
            singleLayout: 'basic'
        }
    },
    {
        name:'test',
        path: '/test',
        component: 'self',
        meta: {
            title: '休息一下看星星吧',
            icon: 'ph:star-bold',
            requiresAuth: true,
            singleLayout: 'basic'
        }
    },
    {
        name:'personalInfo1',
        path: '/personalInfo1',
        component: 'self',
        meta: {
            title: '个人信息',
            icon: 'material-symbols:manage-accounts-outline-rounded',
            requiresAuth: true,
            singleLayout: 'basic',
            role: '业务员'
        }
    },
    {
        name:'registerCustomer',
        path: '/registerCustomer',
        component: 'self',
        meta: {
            title: '登记客户',
            icon: 'ph:trademark-registered',
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
            icon: 'ph:trademark-registered',
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
            icon: 'material-symbols:featured-play-list-outline',
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
            icon: 'material-symbols:featured-play-list-outline',
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
            icon: 'icon-park-outline:paper-money',
            requiresAuth: true,
            singleLayout: 'basic',
            role: '业务员'
        }
    },
    {
        name:'personalInfo2',
        path: '/personalInfo2',
        component: 'self',
        meta: {
            title: '个人信息',
            icon: 'material-symbols:manage-accounts-outline-rounded',
            requiresAuth: true,
            singleLayout: 'basic',
            role: '维修员'
        }
    },
    {
        name:'myWorkOrder',
        path: '/myWorkOrder',
        component: 'self',
        meta: {
            title: '我的工单',
            icon: 'material-symbols:featured-play-list-outline',
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
            icon: 'ph:trademark-registered',
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

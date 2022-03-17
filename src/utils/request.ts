import {LoadingBarApi} from 'naive-ui';
import axios from 'axios';
import {storage} from '../utils';
import {useRouterPush} from "@/composables";

// 新建一个axios实例service
const service = (axios as any).create({
    baseURL: import.meta.env.VITE_APP_INTERFACE_URL,
    timeout: 600 * 1000
});

// 请求拦截器
service.interceptors.request.use(
    (config: any) => {
        // 发送请求前做的一些处理,数据转化,配置请求头,设置token,设置loading等,根据需求去添加
        // 设置token
        const token = storage.get('token');
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: any) => {
        console.log(error);
        return Promise.reject(error);
    }
);

declare const window: Window & { $message: any; $loadingBar: LoadingBarApi };
// 响应拦截器
service.interceptors.response.use(
    // 对响应数据做处理
    (response: any) => {
        let res: any = response.data;
        if (res.code === 200) {
            console.log(`请求${response.config.baseURL}${response.config.url} 成功，返回：`);
            res = res.data;
            console.log(res);
            return Promise.resolve(res); // 只将数据返回
        } else {
            if (res) {
                // 1.公共错误处理
                // 2.根据响应码具体处理
                console.log(`请求${response.config.baseURL}${response.config.url} 失败，返回：`);
                console.log(response);
                switch (res.code) {
                    case 400:
                        switch (res.message) {
                            case '账户已激活':
                                window.$message.error('激活失败，账户已激活。');
                                break;
                        }
                        break;
                    case 401:
                        storage.remove('token');
                        switch (res.message) {
                            case '账号或密码错误':
                                window.$message.error('账号或密码错误');
                                break;
                            case '登录过期':
                                const {routerPush} = useRouterPush();
                                routerPush({name: 'login'});
                                break;
                        }
                        break;
                    case 403:
                        break;
                    case 404:
                        window.$message.error('请求错误');
                        break;
                    case 405:
                        break;
                    case 408:
                        break;
                    case 500:
                        window.$message.error('服务器错误');
                        break;
                    case 501:
                        break;
                    case 502:
                        window.$message.error('网络错误');
                        break;
                    case 503:
                        break;
                    case 504:
                        break;
                    case 505:
                        break;
                    default:
                        console.log(`连接错误${res.code}`);
                }
            } else {
                if (JSON.stringify(res).includes('timeout')) {
                    console.log('服务器响应超时，请刷新当前页');
                }
            }
            /* 异常处理结束 */
            window.$loadingBar.error();
            return Promise.reject(res);
        }
    },
    (error: any) => {
        /* 异常处理开始 */
        console.log(error);
        return Promise.reject(error);
    }
);

export default service;

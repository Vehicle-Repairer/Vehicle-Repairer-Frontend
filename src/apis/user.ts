import http from '@/utils/http';

const repairmanActiveAPI = (params: any) => {
    return http.post('/user/repairman-active', params);
};
const salesmanActiveAPI = (params: any) => {
    return http.post('/user/salesman-active', params);
};
export {repairmanActiveAPI, salesmanActiveAPI};

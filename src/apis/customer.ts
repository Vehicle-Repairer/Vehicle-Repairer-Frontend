import http from '@/utils/http';

function addCustomer(params: { customerName: string, customerType: string, discountRate: number, contactPerson: string, phone: string }): any {
    return http.post('/customer/add-customer', params);
}

function addVehicle(params: {
    frameNumber: string, licenseNumber: string, customerId: number, color: string,
    vehicleModel: string, vehicleType: string
}): any {
    return http.post('/customer/add-vehicle', params);
}

function addAttorney(params: {
    frameNumber: string, licenseNumber: string, customerId: number, fuelAmount: string,
    repairAmount: string, repairType: string, range: number, isFinished: boolean, detailedFault: string, payType: string
}): any {
    return http.post('/attorney/add-attorney', params);
}

function getCustomerById(params: { customerId: number }): any {
    return http.get('/customer/customer', params);
}

function getCustomerByParams(params: { customerName: string, customerType: string, phone: string }): any {
    return http.get('/customer/get-customers-by-param', params);
}

function getVehicleByCustomerId(params: { customerId: number }): any {
    return http.get('/customer/vehicle', params);
}

export { addCustomer, addVehicle, getCustomerById, getVehicleByCustomerId, getCustomerByParams, addAttorney };
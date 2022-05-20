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

function getCustomerById(params: { customerId: number }): any {
    return http.get('/customer/customer', params);
}

function getVehicleByCustomerId(params: { customerId: number }): any {
    return http.get('/customer/vehicle', params);
}

export { addCustomer, addVehicle, getCustomerById, getVehicleByCustomerId };
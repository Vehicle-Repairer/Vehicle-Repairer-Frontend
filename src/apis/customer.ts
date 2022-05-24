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

function addAssignment(params: {
    attorneyId: number, itemId: number, repairmanId: string, isFinished: boolean
}): any {
    return http.post('/assignment/add-assignment', params);
}

function addRepairItem(params: {
    itemName: string, needTime: number, profession: string,
}): any {
    return http.post('/repairItem/add-repair-item', params);
}

function addPart(params: {
    partName: string, partPrice: number,
}): any {
    return http.post('/parts/add-part', params);
}

function addPartConsumption(params: {
    assignmentId: number, partId: number, partAmount: number,
}): any {
    return http.post('/parts/add-partConsumption', params);
}

function finishAssignment(params: {
    assignmentId: number, isFinished: boolean,
}): any {
    return http.post('/assignment/finish-assignment', params);
}

function modifyInfo(params: {
    birthday: string, hourCost: number, manName: string, sex: string,
    phone: string, address: string, emailAddress: string, profession: string,
}): any {
    return http.post('/user/modify-information', params);
}

function finishAttorney(params: {
    attorneyId: number, isFinished: boolean,
}): any {
    return http.post('/attorney/finish', params);
}

function addPrice(params: {
    attorneyId: number,
}): any {
    return http.post('/attorney/total-price', params);
}

function getCustomerById(params: { customerId: number }): any {
    return http.get('/customer/customer', params);
}

function getCustomerByParams(params: { name: string | null, type: string | null, phone: string | null }): any {
    return http.get('/customer/get-customers-by-param', params);
}

function getAttorneyByCustomerId(params: { customerId: number }): any {
    return http.get('/attorney/customer', params);
}

function getVehicleByCustomerId(params: { customerId: number }): any {
    return http.get('/customer/vehicle', params);
}

function getRepairItems(params: { itemName: string | null, profession: string | null }): any {
    return http.get('/repairItem/get-repair-items', params);
}

function getAllRepairman(params: {}): any {
    return http.get('/repairman/get-all-repairman', params);
}

function getMyInfo(params: {}): any {
    return http.get('/user/me', params);
}

function getAssignment(params: { repairmanId: string, isFinished: boolean | null}): any {
    return http.get('/assignment/assignment-by-repairman', params);
}

function getAllParts(params: {}): any {
    return http.get('/parts/get-all-parts', params);
}

function getAllAttorney(params: {}): any {
    return http.get('/attorney/salesman', params);
}

export {getAllAttorney, getAllParts, getAssignment, getMyInfo, addCustomer, addVehicle, getCustomerById, getVehicleByCustomerId, getCustomerByParams, addPrice, finishAttorney, modifyInfo, finishAssignment, addPartConsumption, addPart, addAttorney, getAttorneyByCustomerId, getRepairItems, getAllRepairman, addAssignment, addRepairItem };
<template>
    <div>
        <div class="flex flex-row gap-10 w-full h-full">
            <div class="flex flex-col gap-10 w-1/2">
                <!-- 客户车辆填写 -->
                <div class="s-card flex flex-col p-5 space-x-2 space-y-2">
                    <div class="text-lg font-semibold text-primary s-underline">{{ '登记维修信息' }}</div>
                    <n-form
                        ref="formRef"
                        :model="model"
                        :rules="rules"
                        label-placement="top"
                        label-width="auto"
                        require-mark-placement="right-hanging"
                    >
                        <div class="grid grid-cols-3 gap-4">
                            <div>
                                <n-form-item label="客户编号" path="customerId">
                                    <n-input v-model:value="model.customerId" clearable placeholder=""/>
                                </n-form-item>
                            </div>
                            <div>
                                <n-form-item label="车牌号" path="licenseNumber">
                                    <n-input v-model:value="model.licenseNumber" clearable placeholder=""/>
                                </n-form-item>
                            </div>
                            <div>
                                <n-form-item label="维修类型" path="repairType">
                                    <n-select v-model:value="model.repairType" clearable :options="repairTypeOption"/>
                                </n-form-item>
                            </div>
                            <div>
                                <n-form-item label="作业分类" path="repairAmount">
                                    <n-select v-model:value="model.repairAmount" clearable
                                              :options="repairAmountOption"/>
                                </n-form-item>
                            </div>
                            <div>
                                <n-form-item label="结算类型" path="payType">
                                    <n-select v-model:value="model.payType" clearable :options="payTypeOption"/>
                                </n-form-item>
                            </div>
                            <div>
                                <n-form-item label="进场里程数" path="range">
                                    <n-input v-model:value="model.range" clearable placeholder="">
                                        <template #suffix>km</template>
                                    </n-input>
                                </n-form-item>
                            </div>
                            <div>
                                <n-form-item label="进场油量" path="fuelAmount">
                                    <n-select v-model:value="model.fuelAmount" clearable :options="fuelAmountOption"/>
                                </n-form-item>
                            </div>
                            <div>
                                <n-form-item label="车架号" path="frameNumber">
                                    <n-input v-model:value="model.frameNumber" clearable placeholder=""/>
                                </n-form-item>
                            </div>
                        </div>
                        <div>
                            <n-form-item label="故障描述" path="detailedFault">
                                <n-input v-model:value="model.detailedFault" clearable placeholder="请输入故障描述"
                                         type="textarea"/>
                            </n-form-item>
                        </div>
                        <div class="flex justify-center">
                            <n-button round type="primary" @click="handleButtonClick">提交</n-button>
                        </div>
                    </n-form>
                </div>

                <div class="s-card flex flex-col p-5 space-x-2 space-y-2">
                    <div class="text-lg font-semibold text-primary s-underline">{{ '查询车辆信息' }}</div>
                    <div class="flex flex-row justify-between">
                        <div>
                            客户编号
                            <n-input v-model:value="model.customerIdSearch" clearable placeholder="请输入客户编号"/>
                        </div>
                        <div>
                            <n-button round type="primary" @click="searchButtonClick2">查询</n-button>
                        </div>
                    </div>
                    <div class="flex justify-center">
                    </div>
                    <n-data-table ref="dataTableInst2" :columns="columnsCar" :data="dataCar" :pagination="pagination2"
                                  size="large"/>
                </div>
            </div>

            <!-- 维修委托信息填写 -->
            <div class="flex flex-col gap-10 w-1/2">

                <div class="s-card flex flex-col p-5 space-y-2 space-x-2 min-h-full">
                    <div class="text-lg font-semibold text-primary s-underline">{{ '查询客户信息' }}</div>
                    <div>
                        <n-table :single-line="false">
                            <thead>
                            <tr>
                                <th>客户性质</th>
                                <th>客户名称</th>
                                <th>联系电话</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <n-select
                                        v-model:value="model.customerTypeSearch"
                                        clearable
                                        :options="customerTypeOptions"
                                    />
                                </td>
                                <td>
                                    <n-input v-model:value="model.customerNameSearch" clearable placeholder=""/>
                                </td>
                                <td>
                                    <n-input v-model:value="model.phoneSearch" clearable placeholder=""/>
                                </td>
                            </tr>
                            </tbody>
                        </n-table>
                    </div>
                    <div class="flex justify-center">
                        <n-button round type="primary" @click="searchButtonClick">查询</n-button>
                    </div>
                    <n-data-table ref="dataTableInst" :columns="columns" :data="data" :pagination="pagination"/>
                </div>

            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref, Ref} from 'vue';
import {FormInst, useMessage} from 'naive-ui';
import {addAttorney, getCustomerByParams, getVehicleByCustomerId} from '@/apis';

const data: Ref<{
    customerId: number;
    customerName: string;
    customerType: string;
    discountRate: number;
    contactPerson: string;
    phone: string;
}[]> = ref([]);

const dataCar: Ref<{
    customerId: number;
    frameNumber: string;
    licenseNumber: string;
    color: string;
    vehicleModel: string;
}[]> = ref([]);

export default defineComponent({
    setup() {
        onMounted(() => {
            let tempcustomerNameSearch = model.value.customerNameSearch !== '' ? model.value.customerNameSearch : null;
            let tempcustomerTypeSearch = model.value.customerTypeSearch !== '' ? model.value.customerTypeSearch : null;
            let tempphoneSearch = model.value.phoneSearch !== '' ? model.value.phoneSearch : null;
            getCustomerByParams({
                name: tempcustomerNameSearch,
                type: tempcustomerTypeSearch,
                phone: tempphoneSearch
            })
                .then(
                    (res: {
                        customers: Array<{
                            customerId: number;
                            customerName: string;
                            customerType: string;
                            discountRate: number;
                            contactPerson: string;
                            phone: string;
                        }>;
                    }) => {
                        console.log(res);
                        data.value.length = 0;
                        console.log(data.value[0]);
                        for (let i = 0; i < res.customers.length; i++) {
                            data.value[i] = res.customers[i];
                            console.log(data.value[i]);
                        }
                    }
                )
                .catch((error: any) => {
                    console.log(error);
                    message.error('查询失败');
                });
        });
        const dataTableInstRef = ref(null);
        const dataTableInstRef2 = ref(null);
        const formRef = ref<FormInst | null>(null);
        const formRe = ref<FormInst | null>(null);
        const message = useMessage();
        const model = ref({
            licenseNumber: '',
            frameNumber: '',
            repairAmount: '',
            range: 0,
            fuelAmount: '',
            customerId: 0,
            repairType: '',
            detailedFault: '',
            payType: '',
            isFinished: false,
            attorneyId: '',
            customerIdSearch: 0,
            customerNameSearch: '',
            customerTypeSearch: '',
            phoneSearch: '',
        });
        return {
            formRef,
            formRe,
            model,
            data,
            columns,
            dataCar,
            columnsCar,
            dataTableInst: dataTableInstRef,
            dataTableInst2: dataTableInstRef2,
            pagination: ref({pageSize: 12}),
            pagination2: ref({pageSize: 5}),
            repairTypeOption: ['普通', '加急'].map(v => ({
                label: v,
                value: v
            })),
            customerTypeOptions: ['单位', '个人'].map(v => ({
                label: v,
                value: v
            })),
            repairAmountOption: ['小修', '中修', '大修'].map(v => ({
                label: v,
                value: v
            })),
            payTypeOption: ['自付', '三包', '进保'].map(v => ({
                label: v,
                value: v
            })),
            fuelAmountOption: ['0', '1/4', '1/2', '3/4', '1'].map(v => ({
                label: v,
                value: v
            })),
            rules: {
                customerId: {
                    required: true,
                    trigger: ['blur', 'input'],
                    message: '请输入客户编号'
                },
                frameNumber: {
                    required: true,
                    trigger: ['blur', 'input'],
                    message: '请输入车架号'
                },
                licenseNumber: {
                    required: true,
                    trigger: ['blur', 'input'],
                    message: '请输入车牌号'
                },
                repairType: {
                    required: true,
                    trigger: ['blur', 'input'],
                    message: '请输入维修类型'
                },
                repairAmount: {
                    required: true,
                    trigger: ['blur', 'change'],
                    message: '请选择作业分类'
                },
                range: {
                    required: true,
                    trigger: ['blur', 'change'],
                    message: '请填写进厂里程数'
                },
                fuelAmount: {
                    required: true,
                    trigger: ['blur', 'change'],
                    message: '请填写进厂油量'
                },
                detailedFault: {
                    required: true,
                    trigger: ['blur', 'change'],
                    message: '请填写故障描述'
                }
            },
            sortId() {
                dataTableInstRef.value.sort('customerId', 'ascend');
            },
            sortDiscount() {
                dataTableInstRef.value.sort('discountRate', 'ascend');
            },
            handleButtonClick(e: MouseEvent) {
                e.preventDefault();
                formRef.value?.validate(errors => {
                    if (!errors) {
                        addAttorney({
                            customerId: model.value.customerId,
                            frameNumber: model.value.frameNumber,
                            licenseNumber: model.value.licenseNumber,
                            repairType: model.value.repairType,
                            repairAmount: model.value.repairAmount,
                            range: model.value.range,
                            fuelAmount: model.value.fuelAmount,
                            isFinished: model.value.isFinished,
                            detailedFault: model.value.detailedFault,
                            payType: model.value.payType
                        })
                            .then(() => {
                                message.success('提交成功');
                            })
                            .catch(() => {
                            });
                    } else {
                        message.error('提交失败');
                    }
                });
            },
            searchButtonClick(a: MouseEvent) {
                let tempcustomerNameSearch = model.value.customerNameSearch !== '' ? model.value.customerNameSearch : null;
                let tempcustomerTypeSearch = model.value.customerTypeSearch !== '' ? model.value.customerTypeSearch : null;
                let tempphoneSearch = model.value.phoneSearch !== '' ? model.value.phoneSearch : null;
                getCustomerByParams({
                    name: tempcustomerNameSearch,
                    type: tempcustomerTypeSearch,
                    phone: tempphoneSearch
                })
                    .then(
                        (res: {
                            customers: Array<{
                                customerId: number;
                                customerName: string;
                                customerType: string;
                                discountRate: number;
                                contactPerson: string;
                                phone: string;
                            }>;
                        }) => {
                            console.log(res);
                            data.value.length = 0;
                            console.log(data.value[0]);
                            for (let i = 0; i < res.customers.length; i++) {
                                data.value[i] = res.customers[i];
                                console.log(data.value[i]);
                            }
                            message.success('查询成功');
                        }
                    )
                    .catch((error: any) => {
                        console.log(error);
                        message.error('查询失败');
                    });
            },
            searchButtonClick2(a: MouseEvent) {
                getVehicleByCustomerId({
                    customerId: model.value.customerIdSearch,
                })
                    .then(
                        (res: {
                            vehicles: Array<{
                                customerId: number;
                                frameNumber: string;
                                licenseNumber: string;
                                color: string;
                                vehicleModel: string;
                            }>;
                        }) => {
                            console.log(res);
                            dataCar.value.length = 0;
                            console.log(dataCar.value[0]);
                            for (let i = 0; i < res.vehicles.length; i++) {
                                dataCar.value[i] = res.vehicles[i];
                                console.log(dataCar.value[i]);
                            }
                            message.success('查询成功');
                        }
                    )
                    .catch((error: any) => {
                        console.log(error);
                        message.error('查询失败');
                    });
            }
        };
    }
});


const columns = [
    {
        title: '客户编号',
        key: 'customerId',
        defaultSortOrder: false,
        sorter: {
            compare: (a: any, b: any) => a.customerId - b.customerId,
            multiple: 3
        }
    },
    {
        title: '客户名称',
        key: 'customerName'
    },
    {
        title: '客户性质',
        key: 'customerType'
    },
    {
        title: '折扣率',
        key: 'discountRate',
        defaultSortOrder: false,
        sorter: {
            compare: (a: any, b: any) => a.discountRate - b.discountRate,
            multiple: 2
        }
    },
    {
        title: '联系人',
        key: 'contactPerson'
    },
    {
        title: '联系电话',
        key: 'phone'
    }
];


const columnsCar = [
    {
        title: '客户编号',
        key: 'customerId',
        defaultSortOrder: false,
        sorter: {
            compare: (a: any, b: any) => a.customerId - b.customerId,
            multiple: 3
        }
    },
    {
        title: '车架号',
        key: 'frameNumber'
    },
    {
        title: '车牌号',
        key: 'licenseNumber'
    },
    {
        title: '颜色',
        key: 'color',
    },
    {
        title: '车辆类型',
        key: 'vehicleModel'
    },
];


</script>

<style scoped>
</style>



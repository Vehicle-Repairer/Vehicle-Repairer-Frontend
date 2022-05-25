<template>
    <div>
        <div class="flex flex-row gap-10 w-full">
            <div class="flex flex-col gap-10 w-1/3">
                <!-- 搜索栏 -->
                <div class="s-card flex flex-col p-5 space-x-2 space-y-2">
                    <div class="text-lg font-semibold text-primary s-underline">{{ '个人信息' }}</div>
                    <n-form
                        ref="formRef"
                        :model="model"
                        :rules="rules"
                        label-placement="top"
                        label-width="auto"
                        require-mark-placement="right-hanging"
                    >
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <n-form-item label="编号" path="id">
                                    <n-input v-model:value="model.id" :disabled="!active" placeholder=""/>
                                </n-form-item>
                            </div>
                            <div>
                                <n-form-item label="姓名" path="manName">
                                    <n-input v-model:value="model.manName" placeholder=""/>
                                </n-form-item>
                            </div>
                            <div>
                                <n-form-item label="性别" path="sex">
                                    <n-input v-model:value="model.sex" placeholder=""/>
                                </n-form-item>
                            </div>
                            <div>
                                <n-form-item label="手机号" path="phone">
                                    <n-input v-model:value="model.phone" placeholder=""/>
                                </n-form-item>
                            </div>
                            <div>
                                <n-form-item label="出生日期" path="birthday">
                                    <n-input v-model:value="model.birthday" placeholder=""/>
                                </n-form-item>
                            </div>
                            <div>
                                <n-form-item label="地址" path="address">
                                    <n-input v-model:value="model.address" placeholder=""/>
                                </n-form-item>
                            </div>
                            <div>
                                <n-form-item label="邮箱" path="emailAddress">
                                    <n-input v-model:value="model.emailAddress" placeholder=""/>
                                </n-form-item>
                            </div>
                            <div>
                                <n-form-item label="入职日期" path="createdTime">
                                    <n-input v-model:value="model.createdTime" :disabled="!active" placeholder=""/>
                                </n-form-item>
                            </div>
                        </div>
                        <div class="flex justify-center">
                            <n-button round type="primary" @click="handleButtonClick">保存修改</n-button>
                        </div>
                    </n-form>
                </div>
            </div>

            <div class="flex flex-col gap-10 w-2/3">
                <div class="s-card flex flex-col p-5 space-y-2">
                    <div class="text-lg font-semibold text-primary s-underline">{{ '我的维修委托书' }}</div>
                    <n-data-table ref="dataTableInst" :columns="columnsAttorney" :data="dataAttorney"
                                  :pagination="pagination"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref, Ref} from 'vue';
import {FormInst, useMessage} from 'naive-ui';
import {getAllAttorney, getMyInfo, modifyInfo} from '@/apis';


const dataAttorney: Ref<{
    attorneyId: number;
    customerId: number;
    frameNumber: string;
    licenseNumber: string;
    repairType: string;
    repairAmount: string;
    inFactoryTime: string;
    isFinishedString: string;
}[]> = ref([]);

export default defineComponent({
    setup() {
        onMounted(() => {
            getMyInfo({})
                .then(
                    (res: {
                        me: {
                            id: string;
                            manName: string;
                            sex: string;
                            phone: string;
                            birthday: string;
                            address: string;
                            emailAddress: string;
                            createdTime: string;
                            profession: string;
                            hourCost: number;
                        };
                    }) => {
                        model.value.id = res.me.id;
                        model.value.manName = res.me.manName;
                        model.value.sex = res.me.sex;
                        model.value.phone = res.me.phone;
                        model.value.birthday = res.me.birthday;
                        model.value.address = res.me.address;
                        model.value.emailAddress = res.me.emailAddress;
                        model.value.createdTime = res.me.createdTime.slice(0, 10);
                        model.value.profession = res.me.profession;
                        model.value.hourCost = res.me.hourCost;
                    }
                )
                .catch((error: any) => {
                    console.log(error);
                });
            getAllAttorney({})
                .then(
                    (res: {
                        attorneys: Array<{
                            attorneyId: number;
                            customerId: number;
                            frameNumber: string;
                            licenseNumber: string;
                            repairType: string;
                            repairAmount: string;
                            inFactoryTime: string;
                            isFinishedString: string;
                        }>;
                    }) => {
                        console.log(res);
                        dataAttorney.value.length = 0;
                        for (let i = 0; i < res.attorneys.length; i++) {
                            dataAttorney.value[i] = res.attorneys[i];
                            console.log(dataAttorney.value[i]);
                        }
                    }
                )
                .catch((error: any) => {
                    console.log(error);
                });
        });
        const dataTableInstRef = ref(null);
        const formRef = ref<FormInst | null>(null);
        const message = useMessage();
        const model = ref({
            itemName: '',
            itemNameSearch: '',
            needTime: 0,
            profession: '',
            vehicleModel: '',
            vehicleType: '',
            customerNameSearch: '',
            customerTypeSearch: '',
            phoneSearch: '',
            customerId: 0,
            assignmentId: 0,
            isFinished: true,
            professionSearch: '',
            id: '',
            manName: '',
            sex: '',
            phone: '',
            birthday: '',
            address: '',
            emailAddress: '',
            createdTime: '',
            hourCost: 0
        });
        return {
            formRef,
            model,
            dataAttorney,
            columnsAttorney,
            active: ref(false),
            dataTableInst: dataTableInstRef,
            pagination: ref({pageSize: 7}),
            vehicleTypeOptions: ['小型车', '中型车', '大型车'].map(v => ({
                label: v,
                value: v
            })),
            customerTypeOptions: ['单位', '个人'].map(v => ({
                label: v,
                value: v
            })),
            rules: {
                hourCost: {
                    required: true,
                    trigger: ['blur', 'input'],
                    message: '请输入工时单价'
                },
                phone: {
                    required: true,
                    trigger: ['blur', 'input'],
                    message: '请输入手机号'
                },
                profession: {
                    required: true,
                    trigger: ['blur', 'input'],
                    message: '请输入工种'
                },
                manName: {
                    required: true,
                    trigger: ['blur', 'input'],
                    message: '请输入姓名'
                },
                sex: {
                    required: true,
                    trigger: ['blur', 'input'],
                    message: '请输入性别'
                },
                address: {
                    required: true,
                    trigger: ['blur', 'input'],
                    message: '请输入地址'
                },
                emailAddress: {
                    required: true,
                    trigger: ['blur', 'input'],
                    message: '请输入邮箱'
                },
                birthday: {
                    required: true,
                    trigger: ['blur', 'input'],
                    message: '请输入出生日期'
                }
            },
            sortId() {
                dataTableInstRef.value.sort('customerId', 'ascend');
            },
            sortDiscount() {
                dataTableInstRef.value.sort('discountRate', 'ascend');
            },

            handleButtonClick(e: MouseEvent) {
                formRef.value?.validate(errors => {
                    if (!errors) {
                        modifyInfo({
                            birthday: model.value.birthday,
                            hourCost: model.value.hourCost,
                            manName: model.value.manName,
                            profession: model.value.profession,
                            sex: model.value.sex,
                            phone: model.value.phone,
                            address: model.value.address,
                            emailAddress: model.value.emailAddress
                        }).then(() => {
                            message.success('提交成功');
                        }).catch(() => {
                        });
                    } else {
                        message.error('提交失败');
                    }
                });
            },
        };
    }
});

const columnsAttorney = [
    {
        title: '维修委托编号',
        key: 'attorneyId',
        defaultSortOrder: true,
        sorter: {
            compare: (a: any, b: any) => a.attorneyId - b.attorneyId,
            multiple: 3
        }
    },
    {
        title: '客户编号',
        key: 'customerId'
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
        title: '维修类别',
        key: 'repairType',
        defaultSortOrder: true,
        sorter: {
            compare: (a: any, b: any) => a.repairType - b.repairType,
            multiple: 3
        }
    },
    {
        title: '作业类型',
        key: 'repairAmount'
    },
    {
        title: '进厂时间',
        key: 'inFactoryTime'
    },
    {
        title: '状态',
        key: 'isFinishedString'
    }
];
</script>
<style scoped>
</style>



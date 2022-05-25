<template>
    <div>
        <div class="flex flex-row gap-10 w-full">
            <div class="flex flex-col gap-10 w-2/5">
                <!-- 客户车辆填写 -->
                <div class="s-card flex flex-col p-5 space-x-2 space-y-2">
                    <div class="text-lg font-semibold text-primary s-underline">{{ '添加零件项目' }}</div>
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
                                <n-form-item label="零件名称" path="partName">
                                    <n-input v-model:value="model.partName" placeholder=""/>
                                </n-form-item>
                            </div>
                            <div>
                                <n-form-item label="零件单价" path="partPrice">
                                    <n-input v-model:value="model.partPrice" placeholder=""/>
                                </n-form-item>
                            </div>
                        </div>
                        <div class="flex justify-center">
                            <n-button round type="primary" @click="partHandleButtonClick">提交</n-button>
                        </div>
                    </n-form>
                </div>

                <div class="s-card flex flex-col p-5 space-y-2">
                    <div class="text-lg font-semibold text-primary s-underline">{{ '零件信息检索' }}</div>
                    <n-data-table ref="dataTableInstPart" :columns="columnsPart" :data="dataPart"
                                  :pagination="pagination"/>
                </div>
            </div>

            <!-- 维修委托信息填写 -->
            <div class="flex flex-col gap-10 w-3/5">
                <div class="s-card flex flex-col p-5 space-x-2 space-y-2">
                    <div class="text-lg font-semibold text-primary s-underline">{{ '上传零件消耗' }}</div>
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
                                <n-form-item label="工单编号" path="assignmentId">
                                    <n-input v-model:value="model.assignmentId" placeholder=""/>
                                </n-form-item>
                            </div>
                            <div>
                                <n-form-item label="零件编号" path="partId">
                                    <n-input v-model:value="model.partId" placeholder=""/>
                                </n-form-item>
                            </div>
                            <div>
                                <n-form-item label="零件数量" path="partAmount">
                                    <n-input v-model:value="model.partAmount" placeholder=""/>
                                </n-form-item>
                            </div>
                        </div>
                        <div class="flex justify-center">
                            <n-button round type="primary" @click="partRegisterHandleButtonClick">提交</n-button>
                        </div>
                    </n-form>
                </div>

                <div class="s-card flex flex-col p-5 space-y-2">
                    <div class="text-lg font-semibold text-primary s-underline">{{ '工单信息检索' }}</div>
                    <n-data-table ref="dataTableInst" :columns="columnsAssignment" :data="dataAssignment"
                                  :pagination="paginationAssignment"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref, Ref} from 'vue';
import {FormInst, useMessage} from 'naive-ui';
import {addPart, addPartConsumption, getAllParts, getAssignment, getMyInfo} from '@/apis';

const dataPart: Ref<{
    partId: number;
    partName: string;
    partPrice: number;
}[]> = ref([]);

const dataAssignment: Ref<{
    assignmentId: number;
    frameNumber: string;
    repairItem: string;
    repairType: string;
    repairTime: string;
    detailedFault: string;
    isFinished: string;
}[]> = ref([]);

export default defineComponent({
    setup() {
        onMounted(() => {
            getAllParts({})
                .then(
                    (res: {
                        零件信息: Array<{
                            partId: number;
                            partName: string;
                            partPrice: number;
                        }>;
                    }) => {
                        console.log(res);
                        dataPart.value.length = 0;
                        for (let i = 0; i < res.零件信息.length; i++) {
                            dataPart.value[i] = res.零件信息[i];
                            console.log(dataPart.value[i]);
                        }
                    }
                )
                .catch((error: any) => {
                    console.log(error);
                });
            getMyInfo({})
                .then(
                    (res: {
                        me: {
                            id: string;
                        };
                    }) => {
                        getAssignment({
                            repairmanId: res.me.id,
                            isFinished: false,
                        }).then(
                            (response: {
                                assignments: Array<{
                                    assignmentId: number;
                                    frameNumber: string;
                                    repairItem: string;
                                    repairType: string;
                                    repairTime: string;
                                    detailedFault: string;
                                    isFinished: string;
                                }>;
                            }) => {
                                console.log(response);
                                dataAssignment.value.length = 0;
                                console.log(dataAssignment.value[0]);
                                for (let i = 0; i < response.assignments.length; i++) {
                                    dataAssignment.value[i] = response.assignments[i];
                                    console.log(dataAssignment.value[i]);
                                }
                            }
                        );
                    }
                )
                .catch((error: any) => {
                    console.log(error);
                });
        });
        const dataTableInstRef = ref(null);
        const dataTableInstRefPart = ref(null);
        const formRef = ref<FormInst | null>(null);
        const message = useMessage();
        const model = ref({
            partPrice: 0,
            partName: '',
            partAmount: 0,
            partId: 0,
            vehicleType: '',
            customerNameSearch: '',
            registerPartPrice: 0,
            registerpartName: '',
            assignmentId: 0,
        });
        return {
            formRef,
            model,
            dataPart,
            columnsPart,
            dataAssignment,
            columnsAssignment,
            dataTableInstPart: dataTableInstRefPart,
            pagination: ref({pageSize: 10}),
            paginationAssignment: ref({pageSize: 8}),
            vehicleTypeOptions: ['小型车', '中型车', '大型车'].map(v => ({
                label: v,
                value: v
            })),
            rules: {
                customerId: {
                    required: true,
                    trigger: ['blur', 'input'],
                    message: '请输入客户编号'
                },
                partName: {
                    required: true,
                    trigger: ['blur', 'input'],
                    message: '请输入车架号'
                },
                partPrice: {
                    required: true,
                    trigger: ['blur', 'input'],
                    message: '请输入车牌号'
                }
            },
            sortId() {
                dataTableInstRef.value.sort('customerId', 'ascend');
            },
            sortDiscount() {
                dataTableInstRef.value.sort('discountRate', 'ascend');
            },
            partHandleButtonClick(e: MouseEvent) {
                formRef.value?.validate(errors => {
                    if (!errors) {
                        addPart({
                            partName: model.value.partName,
                            partPrice: model.value.partPrice
                        }).then(() => {
                            message.success('提交成功');
                        }).catch(() => {
                        });
                    } else {
                        message.error('提交失败');
                    }
                });
            },
            partRegisterHandleButtonClick(e: MouseEvent) {
                formRef.value?.validate(errors => {
                    if (!errors) {
                        addPartConsumption({
                            assignmentId: model.value.assignmentId,
                            partId: model.value.partId,
                            partAmount: model.value.partAmount,
                        }).then(() => {
                            message.success('提交成功');
                        }).catch(() => {
                        });
                    } else {
                        message.error('提交失败');
                    }
                });
            },
            itemSearchButtonClick(a: MouseEvent) {
                getAllParts({})
                    .then(
                        (res: {
                            零件信息: Array<{
                                partId: number;
                                partName: string;
                                partPrice: number;
                            }>;
                        }) => {
                            console.log(res);
                            dataPart.value.length = 0;
                            for (let i = 0; i < res.零件信息.length; i++) {
                                dataPart.value[i] = res.零件信息[i];
                                console.log(dataPart.value[i]);
                            }
                        }
                    )
                    .catch((error: any) => {
                        console.log(error);
                    });
            },
            assignmentnSearchButtonClick(a: MouseEvent) {
                getMyInfo({})
                    .then(
                        (res: {
                            me: {
                                id: string;
                            };
                        }) => {
                            getAssignment({
                                repairmanId: res.me.id,
                                isFinished: false,
                            }).then(
                                (response: {
                                    assignments: Array<{
                                        assignmentId: number;
                                        frameNumber: string;
                                        repairItem: string;
                                        repairType: string;
                                        repairTime: string;
                                        detailedFault: string;
                                        isFinished: string;
                                    }>;
                                }) => {
                                    console.log(response);
                                    dataAssignment.value.length = 0;
                                    console.log(dataAssignment.value[0]);
                                    for (let i = 0; i < response.assignments.length; i++) {
                                        dataAssignment.value[i] = response.assignments[i];
                                        console.log(dataAssignment.value[i]);
                                    }
                                }
                            );
                        }
                    )
                    .catch((error: any) => {
                        console.log(error);
                    });
            },
        };
    }
});

const columnsPart = [
    {
        title: '零件编号',
        key: 'partId',
        defaultSortOrder: false,
        sorter: {
            compare: (a: any, b: any) => a.customerId - b.customerId,
            multiple: 3
        }
    },
    {
        title: '零件名称',
        key: 'partName'
    },
    {
        title: '零件价格',
        key: 'partPrice'
    }
];

const columnsAssignment = [
    {
        title: '工单编号',
        key: 'assignmentId',
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
        title: '维修类型',
        key: 'repairType'
    },
    {
        title: '维修项目',
        key: 'repairItem'
    },
    {
        title: '工时',
        key: 'repairTime'
    },
    {
        title: '故障描述',
        key: 'detailedFault'
    },
    {
        title: '状态',
        key: 'isFinished'
    }
];
</script>
<style scoped>
</style>



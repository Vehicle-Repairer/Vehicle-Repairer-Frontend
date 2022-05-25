<template>
    <div>
        <div class="flex flex-row gap-10 w-full">
            <div class="flex flex-col gap-10 w-1/2">
                <!-- 搜索栏 -->
                <div class="s-card flex flex-col p-5 space-x-2 space-y-2">
                    <div class="text-lg font-semibold text-primary s-underline">{{ '添加维修项目' }}</div>
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
                                <n-form-item label="项目名称" path="itemName">
                                    <n-input v-model:value="model.itemName" placeholder=""/>
                                </n-form-item>
                            </div>
                            <div>
                                <n-form-item label="工时" path="needTime">
                                    <n-input v-model:value="model.needTime" placeholder=""/>
                                </n-form-item>
                            </div>
                            <div>
                                <n-form-item label="负责工种" path="profession">
                                    <n-input v-model:value="model.profession" placeholder=""/>
                                </n-form-item>
                            </div>
                        </div>
                        <div class="flex justify-center">
                            <n-button round type="primary" @click="handleButtonClick">提交</n-button>
                        </div>
                    </n-form>
                </div>

                <div class="s-card flex flex-col p-5 space-x-2 space-y-2">
                    <div class="text-lg font-semibold text-primary s-underline">{{ '查询维修项目' }}</div>
                    <div>
                        <n-table :single-line="false">
                            <thead>
                            <tr>
                                <th>维修项目名称</th>
                                <th>负责工种</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <n-input v-model:value="model.itemNameSearch" placeholder=""/>
                                </td>
                                <td>
                                    <n-input v-model:value="model.professionSearch" placeholder=""/>
                                </td>
                            </tr>
                            </tbody>
                        </n-table>
                    </div>
                    <div class="flex justify-center">
                        <n-button round type="primary" @click="itemSearchButtonClick">查询</n-button>
                    </div>

                    <div>
                        <n-data-table
                            ref="dataTableInstItem"
                            :columns="columnsItem"
                            :data="dataItem"
                            :pagination="paginationItem"
                        />
                    </div>
                </div>
            </div>

            <div class="flex flex-col gap-10 w-1/2">
                <div class="s-card flex flex-col p-5 space-x-2 space-y-2">
                    <div class="text-lg font-semibold text-primary s-underline">{{ '完成维修工单' }}</div>
                    <div>
                        派工单编号
                        <n-input v-model:value="model.assignmentId" placeholder="工单编号"/>
                    </div>
                    <div>
                        <n-button round type="primary" @click="finishButtonClick">完成</n-button>
                    </div>
                </div>

                <div class="s-card flex flex-col p-5 space-y-2">
                    <div class="text-lg font-semibold text-primary s-underline">{{ '我的维修工单' }}</div>
                    <n-data-table ref="dataTableInst" :columns="columns" :data="data" :pagination="pagination"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref, Ref} from 'vue';
import {FormInst, useMessage} from 'naive-ui';
import {addRepairItem, finishAssignment, getAssignment, getMyInfo, getRepairItems} from '@/apis';

const data: Ref<{
    assignmentId: number;
    frameNumber: string;
    repairItem: string;
    repairType: string;
    repairTime: string;
    detailedFault: string;
    isFinished: string;
}[]> = ref([]);

const dataItem: Ref<{
    itemId: number;
    itemName: string;
    needTime: string;
    profession: string;
}[]> = ref([]);

export default defineComponent({
    setup() {
        onMounted(() => {
            let tempitemName = model.value.itemNameSearch !== '' ? model.value.itemNameSearch : null;
            let tempprofession = model.value.professionSearch !== '' ? model.value.professionSearch : null;
            getRepairItems({
                itemName: tempitemName,
                profession: tempprofession
            })
                .then(
                    (res: {
                        维修项目信息: Array<{
                            itemId: number;
                            itemName: string;
                            needTime: string;
                            profession: string;
                        }>;
                    }) => {
                        console.log(res);
                        dataItem.value.length = 0;
                        for (let i = 0; i < res.维修项目信息.length; i++) {
                            dataItem.value[i] = res.维修项目信息[i];
                            console.log(dataItem.value[i]);
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
                            isFinished: false
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
                                data.value.length = 0;
                                console.log(data.value[0]);
                                for (let i = 0; i < response.assignments.length; i++) {
                                    data.value[i] = response.assignments[i];
                                    console.log(data.value[i]);
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
            professionSearch: ''
        });
        return {
            formRef,
            model,
            data,
            columns,
            dataItem,
            columnsItem,
            dataTableInst: dataTableInstRef,
            pagination: ref({pageSize: 10}),
            paginationItem: ref({pageSize: 5}),
            vehicleTypeOptions: ['小型车', '中型车', '大型车'].map(v => ({
                label: v,
                value: v
            })),
            customerTypeOptions: ['单位', '个人'].map(v => ({
                label: v,
                value: v
            })),
            rules: {
                itemName: {
                    required: true,
                    trigger: ['blur', 'input'],
                    message: '请输入客户编号'
                },
                needTime: {
                    required: true,
                    trigger: ['blur', 'input'],
                    message: '请输入车架号'
                },
                profession: {
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
            handleButtonClick(e: MouseEvent) {
                formRef.value?.validate(errors => {
                    if (!errors) {
                        addRepairItem({
                            itemName: model.value.itemName,
                            needTime: model.value.needTime,
                            profession: model.value.profession
                        }).then(() => {
                            message.success('提交成功');
                        }).catch(() => {
                        });
                    } else {
                        message.error('提交失败');
                    }
                });
            },
            finishButtonClick(e: MouseEvent) {
                finishAssignment({
                    assignmentId: model.value.assignmentId,
                    isFinished: model.value.isFinished
                }).then(() => {
                    message.success('提交成功');
                }).catch(() => {
                });
            },
            searchButtonClick(a: MouseEvent) {
                getMyInfo({})
                    .then(
                        (res: {
                            me: {
                                id: string;
                            };
                        }) => {
                            getAssignment({
                                repairmanId: res.me.id,
                                isFinished: false
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
                                    data.value.length = 0;
                                    console.log(data.value[0]);
                                    for (let i = 0; i < response.assignments.length; i++) {
                                        data.value[i] = response.assignments[i];
                                        console.log(data.value[i]);
                                    }
                                }
                            );
                        }
                    )
                    .catch((error: any) => {
                        console.log(error);
                    });
            },
            itemSearchButtonClick(a: MouseEvent) {
                let tempitemName = model.value.itemNameSearch !== '' ? model.value.itemNameSearch : null;
                let tempprofession = model.value.professionSearch !== '' ? model.value.professionSearch : null;
                getRepairItems({
                    itemName: tempitemName,
                    profession: tempprofession
                })
                    .then(
                        (res: {
                            维修项目信息: Array<{
                                itemId: number;
                                itemName: string;
                                needTime: string;
                                profession: string;
                            }>;
                        }) => {
                            console.log(res);
                            dataItem.value.length = 0;
                            for (let i = 0; i < res.维修项目信息.length; i++) {
                                dataItem.value[i] = res.维修项目信息[i];
                                console.log(dataItem.value[i]);
                            }
                        }
                    )
                    .catch((error: any) => {
                        console.log(error);
                    });
            }
        };
    }
});

const columns = [
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

const columnsItem = [
    {
        title: '项目编号',
        key: 'itemId'
    },
    {
        title: '项目名称',
        key: 'itemName'
    },
    {
        title: '所需时间',
        key: 'needTime'
    },
    {
        title: '负责工种',
        key: 'profession'
    }
];
</script>
<style scoped>
</style>



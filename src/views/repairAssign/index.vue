<template>
  <div>
    <div class="flex flex-row gap-10 w-full h-full">
      <div class="flex flex-col gap-10 w-1/2">
        <!-- 客户车辆填写 -->
        <div class="s-card flex flex-col p-5 space-x-2 space-y-2 h-1/5">
          <div class="text-lg font-semibold text-primary s-underline">{{ '添加维修派工单' }}</div>
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
                <n-form-item label="维修委托书编号" path="attorneyId">
                  <n-input v-model:value="model.attorneyId" clearable placeholder="" />
                </n-form-item>
              </div>
              <div>
                <n-form-item label="项目编号" path="itemId">
                  <n-input v-model:value="model.itemId" clearable placeholder="" />
                </n-form-item>
              </div>
              <div>
                <n-form-item label="维修员编号" path="repairmanId">
                  <n-input v-model:value="model.repairmanId" clearable placeholder="" />
                </n-form-item>
              </div>
            </div>
            <div class="flex justify-center">
              <n-button round type="primary" @click="handleButtonClick">提交</n-button>
            </div>
          </n-form>
        </div>

        <div class="s-card flex flex-col p-5 space-y-2 space-x-2 h-4/5">
          <div class="text-lg font-semibold text-primary s-underline">{{ '查询客户委托书信息' }}</div>
          <div>
            <n-table :single-line="false">
              <thead>
                <tr>
                  <th>联系电话</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <n-input v-model:value="model.phoneSearch" clearable placeholder="" />
                  </td>
                </tr>
              </tbody>
            </n-table>
          </div>
          <div class="flex justify-center">
            <n-button round type="primary" @click="attorneySearchButtonClick">查询</n-button>
          </div>
          <n-data-table ref="dataTableInst" :columns="columns" :data="data" :pagination="pagination" />
        </div>
      </div>

      <!-- 维修委托信息填写 -->
      <div class="flex flex-col gap-10 w-1/2">
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
                    <n-input v-model:value="model.itemName" clearable placeholder="" />
                  </td>
                  <td>
                    <n-input v-model:value="model.profession" clearable placeholder="" />
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

        <div class="s-card flex flex-col p-5 space-x-2 space-y-2">
          <div class="text-lg font-semibold text-primary s-underline">{{ '维修员信息' }}</div>
          <n-data-table
            ref="dataTableInstRepair"
            :columns="columnsRepair"
            :data="dataRepair"
            :pagination="paginationRepair"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { FormInst, FormItemRule, useMessage } from 'naive-ui';
import { getCustomerByParams, getAttorneyByCustomerId, getRepairItems, getAllRepairman, addAssignment } from '@/apis';
import { onMounted } from 'vue';

const data: Ref<
  {
    customerId: number;
    attorneyId: number;
    detailedFault: string;
  }[]
> = ref([]);

const dataRepair: Ref<
  {
    id: number;
    manName: string | null;
    phone: string | null;
    emailAddress: string | null;
    profession: string;
    hourCost: number | null;
  }[]
> = ref([]);

const dataItem: Ref<
  {
    itemId: number;
    itemName: string;
    needTime: string;
    profession: string;
  }[]
> = ref([]);

export default defineComponent({
  setup() {
    onMounted(() => {
      let tempitemName = model.value.itemName !== '' ? model.value.itemName : null;
      let tempprofession = model.value.profession !== '' ? model.value.profession : null;
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
      getAllRepairman({})
        .then(
          (res: {
            维修员信息: Array<{
              id: number;
              manName: string | null;
              phone: string | null;
              emailAddress: string | null;
              profession: string;
              hourCost: number | null;
            }>;
          }) => {
            console.log(res);
            dataRepair.value.length = 0;
            console.log(dataRepair.value[0]);
            for (let i = 0; i < res.维修员信息.length; i++) {
              dataRepair.value[i] = res.维修员信息[i];
              console.log(dataRepair.value[i]);
            }
          }
        )
        .catch((error: any) => {
          console.log(error);
        });
    });
    const dataTableInstRef = ref(null);
    const dataTableInstRefItem = ref(null);
    const dataTableInstRefRepair = ref(null);
    const formRef = ref<FormInst | null>(null);
    const formRe = ref<FormInst | null>(null);
    const message = useMessage();
    const model = ref({
      attorneyId: 0,
      frameNumber: '',
      repairAmount: '',
      itemId: 0,
      fuelAmount: '',
      customerNameSearch: '',
      customerTypeSearch: '',
      phoneSearch: '',
      customerId: 0,
      repairmanId: '',
      detailedFault: '',
      payType: '',
      customerIdSearch: 0,
      itemName: '',
      profession: '',
      isFinished: false
    });
    return {
      formRef,
      formRe,
      model,
      data,
      columns,
      dataRepair,
      columnsRepair,
      dataItem,
      columnsItem,
      dataTableInst: dataTableInstRef,
      dataTableInstItem: dataTableInstRefItem,
      dataTableInstRepair: dataTableInstRefRepair,
      pagination: ref({ pageSize: 8 }),
      paginationRepair: ref({ pageSize: 5 }),
      paginationItem: ref({ pageSize: 5 }),
      customerTypeOptions: ['单位', '个人'].map(v => ({
        label: v,
        value: v
      })),
      rules: {
        itemId: {
          required: true,
          trigger: ['blur', 'input'],
          message: '请输入维修项目编号'
        },
        attorneyId: {
          required: true,
          trigger: ['blur', 'input'],
          message: '请输入维修委托编号'
        },
        repairmanId: {
          required: true,
          trigger: ['blur', 'change'],
          message: '请填写维修员编号'
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
            console.log(model.value);
            addAssignment({
              attorneyId: model.value.attorneyId,
              itemId: model.value.itemId,
              repairmanId: model.value.repairmanId,
              isFinished: model.value.isFinished
            })
              .then((response: any) => {
                message.success('提交成功');
              })
              .catch((error: any) => {
                console.log(error);
              });
          } else {
            console.log(errors);
            message.error('提交失败');
          }
        });
      },
      attorneySearchButtonClick(a: MouseEvent) {
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
              getAttorneyByCustomerId({
                customerId: res.customers[0].customerId
              }).then(
                (response: {
                  attorneys: Array<{
                    customerId: number;
                    attorneyId: number;
                    frameNumber: string;
                    licenseNumber: string;
                    repairType: string;
                    repairAmount: string;
                    range: string;
                    fuelAmount: string;
                    salesmanId: string;
                    manName: string;
                    detailedFault: string;
                    inFactoryTime: string;
                    finalPrice: string;
                    payType: string;
                    finished: boolean;
                  }>;
                }) => {
                  console.log(response);
                  data.value.length = 0;
                  console.log(data.value[0]);
                  for (let i = 0; i < response.attorneys.length; i++) {
                    data.value[i] = response.attorneys[i];
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
      repairmanSearchButtonClick(a: MouseEvent) {
        getAllRepairman({})
          .then(
            (res: {
              维修员信息: Array<{
                id: number;
                manName: string | null;
                phone: string | null;
                emailAddress: string | null;
                profession: string;
                hourCost: number | null;
              }>;
            }) => {
              console.log(res);
              dataRepair.value.length = 0;
              console.log(dataRepair.value[0]);
              for (let i = 0; i < res.维修员信息.length; i++) {
                dataRepair.value[i] = res.维修员信息[i];
                console.log(dataRepair.value[i]);
              }
            }
          )
          .catch((error: any) => {
            console.log(error);
          });
      },
      itemSearchButtonClick(a: MouseEvent) {
        let tempitemName = model.value.itemName !== '' ? model.value.itemName : null;
        let tempprofession = model.value.profession !== '' ? model.value.profession : null;
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
    title: '客户编号',
    key: 'customerId',
    defaultSortOrder: false,
    sorter: {
      compare: (a: any, b: any) => a.customerId - b.customerId,
      multiple: 3
    }
  },
  {
    title: '维修委托书编号',
    key: 'attorneyId'
  },
  {
    title: '故障描述',
    key: 'detailedFault'
  }
];

const columnsRepair = [
  {
    title: '维修员编号',
    key: 'id',
    defaultSortOrder: false,
    sorter: {
      compare: (a: any, b: any) => a.customerId - b.customerId,
      multiple: 3
    }
  },
  {
    title: '姓名',
    key: 'manName'
  },
  {
    title: '手机号',
    key: 'phone'
  },
  {
    title: '邮箱',
    key: 'emailAddress'
  },
  {
    title: '工种',
    key: 'profession'
  },
  {
    title: '工时费（每小时）',
    key: 'hourCost'
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



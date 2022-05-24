<template>
  <div>
    <div class="flex flex-row gap-10 w-full">
      <div class="flex flex-col gap-10 w-5/7">
        <!-- 客户车辆填写 -->
        <div class="s-card flex flex-col p-5 space-x-2 space-y-2">
          <div class="text-lg font-semibold text-primary s-underline">{{ '完成维修委托书' }}</div>
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
                <n-form-item label="维修委托编号" path="attorneyId">
                  <n-input v-model:value="model.attorneyId" placeholder="" />
                </n-form-item>
              </div>
            </div>
            <div class="flex justify-center">
              <n-button round type="primary" @click="finishAttorneyButton">完成</n-button>
            </div>
          </n-form>
        </div>

        <div class="s-card flex flex-col p-5 space-y-2">
          <div class="text-lg font-semibold text-primary s-underline">{{ '维修委托书检索' }}</div>
          <div class="flex">
            <n-button round type="primary" @click="attorneySearchButtonClick">查询</n-button>
          </div>
          <n-data-table ref="dataTableInstPart" :columns="columnsAttorney" :data="dataAttorney" :pagination="paginationAttorney" />
        </div>
      </div>

      <!-- 维修委托信息填写 -->
      <div class="flex flex-col gap-10 w-2/7">
        <div class="s-card flex flex-col p-5 space-x-2 space-y-2">
          <div class="text-lg font-semibold text-primary s-underline">{{ '维修价格' }}</div>
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
                  <n-input v-model:value="model.assignmentId" placeholder="" />
                </n-form-item>
              </div>
            </div>
            <div class="flex justify-center">
              <n-button round type="primary" @click="partRegisterHandleButtonClick">提交</n-button>
            </div>
          </n-form>
        </div>

        <div class="s-card flex flex-col p-5 space-y-2">
          <div class="text-lg font-semibold text-primary s-underline">{{ '工单零件信息检索' }}</div>
          <div class="flex">
            <n-button round type="primary" @click="consumptionSearchButtonClick">查询</n-button>
          </div>
          <n-data-table ref="dataTableInst" :columns="columnsConsumption" :data="dataConsumption" :pagination="pagination" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { FormInst, FormItemRule, useMessage } from 'naive-ui';
import { finishAttorney,  getAllAttorney , addPartConsumption } from '@/apis';

const dataAttorney: Ref<
  {
                attorneyId: number;
                customerId: number;
                licenseNumber: string;
                repairType: string;
                inFactoryTime: string;
                finalPrice: number;
                payType: string;
                isFinishedString: string;
  }[]
> = ref([]);

export default defineComponent({
  setup() {
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
      attorneyId: 0,
      isFinished: true,
    });
    return {
      formRef,
      model,
      dataAttorney,
      columnsAttorney,
      dataTableInstPart: dataTableInstRefPart,
      paginationAttorney: ref({ pageSize: 8 }),
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
      finishAttorneyButton(e: MouseEvent) {
        formRef.value?.validate(errors => {
          if (!errors) {
            message.success('提交成功');
            console.log(model.value);
            finishAttorney({
              attorneyId: model.value.attorneyId,
              isFinished: model.value.isFinished,
            }).catch((error: any) => {
              console.log(error);
            });
          } else {
            console.log(errors);
            message.error('提交失败');
          }
        });
      },
      partRegisterHandleButtonClick(e: MouseEvent) {
        formRef.value?.validate(errors => {
          if (!errors) {
            message.success('提交成功');
            console.log(model.value);
            addPartConsumption({
              assignmentId: model.value.assignmentId,
              partId: model.value.partId,
              partAmount: model.value.partAmount,
            }).catch((error: any) => {
              console.log(error);
            });
          } else {
            console.log(errors);
            message.error('提交失败');
          }
        });
      },
      attorneySearchButtonClick(a: MouseEvent) {
        getAllAttorney({})
          .then(
            (res: {
              attorneys: Array<{
                attorneyId: number;
                customerId: number;
                licenseNumber: string;
                repairType: string;
                inFactoryTime: string;
                finalPrice: number;
                payType: string;
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
      }
    };
  }
});

const columnsAttorney = [
  {
    title: '维修委托编号',
    key: 'attorneyId',
    defaultSortOrder: false,
    sorter: {
      compare: (a: any, b: any) => a.customerId - b.customerId,
      multiple: 3
    }
  },
  {
    title: '客户编号',
    key: 'customerId'
  },
  {
    title: '车牌号',
    key: 'licenseNumber'
  },
    {
    title: '维修类别',
    key: 'repairType'
  },
  {
    title: '进厂时间',
    key: 'inFactoryTime'
  },
    {
    title: '最终价格',
    key: 'finalPrice'
  },
  {
    title: '结算方式',
    key: 'payType'
  },
    {
    title: '状态',
    key: 'isFinishedString'
  },
];

const columnsConsumption = [
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
</script>
<style scoped>
</style>



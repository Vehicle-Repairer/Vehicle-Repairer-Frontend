<template>
  <div>
    <div class="flex flex-col gap-10">
      <div class="flex flex-row gap-10">
        <!-- 客户车辆填写 -->
        <div class="s-card flex flex-col p-5 space-x-2 space-y-2 w-1/2 h-1/5">
          <div class="text-lg font-semibold text-primary s-underline">{{ '完成维修委托书' }}</div>
          <div class="flex flex-row justify-between">
            <n-form
              ref="formRef"
              :model="model"
              :rules="rules"
              label-placement="top"
              label-width="auto"
              require-mark-placement="right-hanging"
            >
              <div class="grid grid-cols-1 gap-4">
                <div>
                  <n-form-item label="维修委托编号" path="attorneyId">
                    <n-input v-model:value="model.attorneyId" placeholder="" />
                  </n-form-item>
                </div>
              </div>
            </n-form>
            <div>
              <n-button round type="primary" @click="finishAttorneyButton">完成</n-button>
            </div>
          </div>
          <div class="text-lg font-semibold text-primary s-underline">{{ '维修价格生成' }}</div>
          <div class="flex flex-row justify-between">
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
                  <n-form-item label="维修委托编号" path="attorneyIdPrice">
                    <n-input v-model:value="model.attorneyIdPrice" placeholder="" />
                  </n-form-item>
                </div>
              </div>
            </n-form>
            <div class="flex justify-center">
              <n-button round type="primary" @click="consumptionSearchButtonClick">提交</n-button>
            </div>
          </div>
        </div>

        <div class="s-card flex flex-col p-5 space-x-2 space-y-2 w-1/2 h-1/5">
          <div class="text-lg font-semibold text-primary s-underline">{{ '维修价格明细' }}</div>
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
                <n-form-item label="维修员工费" path="repairmanPrice">
                  <n-input v-model:value="model.repairmanPrice" :disabled="!active" placeholder="" />
                </n-form-item>
              </div>
              <div>
                <n-form-item label="零件价格" path="partsPrice">
                  <n-input v-model:value="model.partsPrice" :disabled="!active" placeholder="" />
                </n-form-item>
              </div>
              <div>
                <n-form-item label="折扣率" path="discountRate">
                  <n-input v-model:value="model.discountRate" :disabled="!active" placeholder="" />
                </n-form-item>
              </div>
              <div>
                <n-form-item label="总价" path="totalPrice">
                  <n-input v-model:value="model.totalPrice" :disabled="!active" placeholder="" />
                </n-form-item>
              </div>
            </div>
          </n-form>
        </div>
      </div>

      <!-- 维修委托信息填写 -->
      <div class="flex gap-10">
        <div class="s-card flex flex-col p-5 space-y-2 w-full">
          <div class="text-lg font-semibold text-primary s-underline">{{ '维修委托书检索' }}</div>
          <n-data-table
            ref="dataTableInstPart"
            :columns="columnsAttorney"
            :data="dataAttorney"
            :pagination="paginationAttorney"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { FormInst, FormItemRule, useMessage } from 'naive-ui';
import { finishAttorney, getAllAttorney, addPartConsumption, getPrice } from '@/apis';
import { onMounted } from 'vue';

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
    onMounted(() => {
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
      attorneyId: 0,
      attorneyIdPrice: 0,
      isFinished: true,
      repairmanPrice: 0,
      partsPrice: 0,
      discountRate: 0,
      totalPrice: 0
    });
    return {
      formRef,
      model,
      dataAttorney,
      columnsAttorney,
      active: ref(false),
      dataTableInstPart: dataTableInstRefPart,
      paginationAttorney: ref({ pageSize: 8 }),
      paginationPrice: ref({ pageSize: 8 }),
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
        }
      },
      sortId() {
        dataTableInstRef.value.sort('attorneyId', 'ascend');
      },
      sortType() {
        dataTableInstRef.value.sort('repairType', 'ascend');
      },
      finishAttorneyButton(e: MouseEvent) {
        formRef.value?.validate(errors => {
          if (!errors) {
            message.success('提交成功');
            console.log(model.value);
            finishAttorney({
              attorneyId: model.value.attorneyId,
              isFinished: model.value.isFinished
            }).catch((error: any) => {
              console.log(error);
            });
          } else {
            console.log(errors);
            message.error('提交失败');
          }
        });
      },
      attorneyHandleButtonClick(e: MouseEvent) {
        formRef.value?.validate(errors => {
          if (!errors) {
            message.success('提交成功');
            console.log(model.value);
            finishAttorney({
              attorneyId: model.value.attorneyId,
              isFinished: model.value.isFinished
            }).catch((error: any) => {
              console.log(error);
            });
          } else {
            console.log(errors);
            message.error('提交失败');
          }
        });
      },
      consumptionSearchButtonClick(a: MouseEvent) {
        getPrice({
          attorneyId: model.value.attorneyIdPrice
        })
          .then(
            (res: {
              价格明细: {
                repairmanPrice: number;
                partsPrice: number;
                discountRate: number;
                totalPrice: number;
              };
            }) => {
              model.value.repairmanPrice = res.价格明细.repairmanPrice;
              model.value.partsPrice = res.价格明细.partsPrice;
              model.value.discountRate = res.价格明细.discountRate;
              model.value.totalPrice = parseFloat(res.价格明细.totalPrice.toFixed(2));
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
  }
];

const columnsPrice = [
  {
    title: '维修员工费',
    key: 'repairmanPrice',
    defaultSortOrder: false,
    sorter: {
      compare: (a: any, b: any) => a.customerId - b.customerId,
      multiple: 3
    }
  },
  {
    title: '零件价格',
    key: 'partsPrice'
  },
  {
    title: '折扣率',
    key: 'discountRate'
  },
  {
    title: '总价',
    key: 'totalPrice'
  }
];
</script>
<style scoped>
</style>



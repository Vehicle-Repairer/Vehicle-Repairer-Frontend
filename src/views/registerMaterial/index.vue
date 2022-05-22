<template>
  <div>
    <div class="flex flex-row gap-10 w-full">
      <div class="flex flex-col gap-10 w-2/5">
        <!-- 搜索栏 -->
        <div class="s-card flex flex-col p-5 space-x-2 space-y-2">
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
                      <n-select v-model:value="model.customerTypeSearch" placeholder="可选择" :options="customerTypeOptions" />
                    </td>
                    <td>
                      <n-input v-model:value="model.customerNameSearch" placeholder=""/>
                    </td>
                    <td>
                      <n-input v-model:value="model.phoneSearch" placeholder="" />
                    </td>
                  </tr>
                </tbody>
            </n-table>
          </div>
          <div class="flex justify-center">
            <n-button round type="primary" @click="searchButtonClick">查询</n-button>
          </div>
        </div>

        <!-- 客户车辆填写 -->
        <div class="s-card flex flex-col p-5 space-x-2 space-y-2">
          <div class="text-lg font-semibold text-primary s-underline">{{ '添加零件' }}</div>
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
                <n-form-item label="零件单价" path="partPrice">
                    <n-input v-model:value="model.partPrice" placeholder="" />
                </n-form-item>
                </div>
                <div>
                <n-form-item label="零件名称" path="partName">
                    <n-input v-model:value="model.partName" placeholder="" />
                </n-form-item>
                </div>
            </div>
            <div class="flex justify-center">
              <n-button round type="primary" @click="handleValidateButtonClick">提交</n-button>
            </div>
          </n-form>

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
                <n-form-item label="零件单价" path="partPrice">
                    <n-input v-model:value="model.partPrice" placeholder="" />
                </n-form-item>
                </div>
                <div>
                <n-form-item label="零件名称" path="partName">
                    <n-input v-model:value="model.partName" placeholder="" />
                </n-form-item>
                </div>
            </div>
            <div class="flex justify-center">
              <n-button round type="primary" @click="handleValidateButtonClick">提交</n-button>
            </div>
          </n-form>
        </div>
      </div>

      <!-- 维修委托信息填写 -->
      <div class="s-card flex flex-col p-5 space-y-2 w-3/5">
        <div class="text-lg font-semibold text-primary s-underline">{{ '客户信息检索' }}</div>
        <n-data-table
          ref="dataTableInst"
          :columns="columns"
          :data="data"
          :pagination="pagination"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { FormInst, FormItemRule, useMessage } from 'naive-ui';
import { addVehicle } from '@/apis';
import { mode } from 'crypto-js';

const columns = [
  {
    title: '客户编号',
    key: 'customerId',
    defaultSortOrder: false,
    sorter: {
      compare: (a:any, b:any) => a.customerId - b.customerId,
      multiple: 3
    }
  },
  {
    title: '客户名称',
    key: 'customerName',
  },
  {
    title: '客户性质',
    key: 'customerType',
  },
  {
    title: '折扣率',
    key: 'discountRate',
    defaultSortOrder: false,
    sorter: {
      compare: (a:any , b:any) => a.discountRate - b.discountRate,
      multiple: 2
    }
  },
  {
    title: '联系人',
    key: 'contactPerson',
  },
  {
    title: '联系电话',
    key: 'phone',
  }
]

const data = [
  {
    customerId: 1,
    customerName: 'John Brown',
    customerType: '个人',
    discountRate: 90,
    contactPerson: 'John Brown',
    phone: '110'
  },
  {
    customerId: 2,
    customerName: '阿松大',
    customerType: '个人',
    discountRate: 80,
    contactPerson: '阿松大',
    phone: '110'
  },
  {
    customerId: 3,
    customerName: 'John吧',
    customerType: '公司',
    discountRate: 85,
    contactPerson: 'John吧',
    phone: '110'
  },
]

export default defineComponent({
  setup() {
    const dataTableInstRef = ref(null);
    const formRef = ref<FormInst | null>(null);
    const message = useMessage();
    const model = ref({
      partPrice: '',
      partName: '',
      color: '',
      vehicleModel: '',
      vehicleType: '',
      customerNameSearch: '',
      customerTypeSearch: '',
      phoneSearch: '',
      customerId: 0,
    });
    return {
      formRef,
      model,
      data,
      columns,
      dataTableInst: dataTableInstRef,
      pagination: ref({ pageSize: 10 }),
      vehicleTypeOptions: ['小型车', '中型车','大型车'].map(v => ({
        label: v,
        value: v
      })),
      customerTypeOptions: ['单位', '个人'].map(v => ({
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
        },
        phoneSearch: {
          required: true,
          trigger: ['blur', 'input'],
          message: '请输入联系电话'
        },
        color: {
          required: true,
          trigger: ['blur', 'input'],
          message: '请输入车辆颜色'
        },
        customerNameSearch: {
          required: true,
          trigger: ['blur', 'input'],
          message: '请输入客户名称'
        },
        vehicleModel: {
          required: true,
          trigger: ['blur', 'change'],
          message: '请选择车型'
        },
        customerTypeSearch: {
          required: true,
          trigger: ['blur', 'change'],
          message: '请选择客户性质'
        },
        vehicleType: {
          required: true,
          trigger: ['blur', 'change'],
          message: '请填写车辆类型'
        },

      },
      sortId () {
        dataTableInstRef.value.sort('customerId', 'ascend')
      },
      sortDiscount () {
        dataTableInstRef.value.sort('discountRate', 'ascend')
      },
      handleValidateButtonClick(e: MouseEvent) {
        e.preventDefault();
        formRef.value?.validate(errors => {
          if (!errors) {
            message.success('提交成功');
            console.log(model.value);
            addVehicle({
              partName: model.value.partName,
              partPrice: model.value.partPrice,
              customerId: model.value.customerId,
              color: model.value.color,
              vehicleModel: model.value.vehicleModel,
              vehicleType: model.value.vehicleType,
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
      searchButtonClick (e: MouseEvent) {
        e.preventDefault()
        formRef.value?.validate((errors) => {
          if (!errors) {
            message.success('验证成功')
          } else {
            console.log(errors)
            message.error('验证失败')
          }
        })
      }
    };
  }
});
</script>
<style scoped>
</style>



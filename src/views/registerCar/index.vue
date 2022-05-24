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
                      <n-select v-model:value="model.customerTypeSearch" clearable :options="customerTypeOptions" />
                    </td>
                    <td>
                      <n-input v-model:value="model.customerNameSearch" clearable placeholder="请输入客户名称"/>
                    </td>
                    <td>
                      <n-input v-model:value="model.phoneSearch" clearable placeholder="请输入手机号码" />
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
          <div class="text-lg font-semibold text-primary s-underline">{{ '登记车辆信息' }}</div>
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
                    <n-input v-model:value="model.customerId" clearable placeholder="" />
                    </n-form-item>
                </div>
                <div>
                <n-form-item label="车牌号" path="licenseNumber">
                    <n-input v-model:value="model.licenseNumber" clearable placeholder="" />
                </n-form-item>
                </div>
                <div>
                <n-form-item label="车架号" path="frameNumber">
                    <n-input v-model:value="model.frameNumber" clearable placeholder="" />
                </n-form-item>
                </div>
                <div>
                <n-form-item label="车型" path="vehicleModel">
                    <n-input v-model:value="model.vehicleModel" clearable placeholder="" />
                </n-form-item>
                </div>
                <div>
                <n-form-item label="颜色" path="color">
                    <n-input v-model:value="model.color" clearable placeholder="" />
                </n-form-item>
                </div>
                <div>
                <n-form-item label="车辆类别" path="vehicleType">
                    <n-select v-model:value="model.vehicleType" clearable :options="vehicleTypeOptions" />
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
import { defineComponent, Ref, ref } from 'vue';
import { FormInst, FormItemRule, useMessage } from 'naive-ui';
import { addVehicle, getCustomerByParams } from '@/apis';

const data:Ref<{
  customerId: number;
  customerName: string;
  customerType: string;
  discountRate: number;
  contactPerson: string;
  phone: string;
}[]> = ref([]);

export default defineComponent({
  setup() {
    const dataTableInstRef = ref(null);
    const formRef = ref<FormInst | null>(null);
    const message = useMessage();
    const model = ref({
      customerId: 0,
      licenseNumber: '',
      frameNumber: '',
      color: '',
      vehicleModel: '',
      vehicleType: '',
      customerNameSearch: '',
      customerTypeSearch: '',
      phoneSearch: '',
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
        color: {
          required: true,
          trigger: ['blur', 'input'],
          message: '请输入车辆颜色'
        },
        vehicleModel: {
          required: true,
          trigger: ['blur', 'change'],
          message: '请选择车型'
        },
        vehicleType: {
          required: true,
          trigger: ['blur', 'change'],
          message: '请填写车辆类别'
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
              frameNumber: model.value.frameNumber,
              licenseNumber: model.value.licenseNumber,
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
              for(let i =0; i < res.customers.length ; i++){
                data.value[i]=res.customers[i];
                console.log(data.value[i]);
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
      compare: (a:any, b:any) => a.customerId - b.customerId,
      multiple: 2
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

</script>
<style scoped>
</style>



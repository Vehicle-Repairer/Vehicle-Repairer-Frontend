<template>
  <div>
    <div class="flex flex-row gap-10 w-full">
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
                    <n-input v-model:value="model.customerId" placeholder="" />
                </n-form-item>
                </div>
                <div>
                <n-form-item label="车牌号" path="licenseNumber">
                    <n-input v-model:value="model.licenseNumber" placeholder="" />
                </n-form-item>
                </div>
                <div>
                <n-form-item label="业务员" path="manName">
                    <n-input v-model:value="model.manName" placeholder="" />
                </n-form-item>
                </div>
                <div>
                <n-form-item label="维修类型" path="repairType">
                    <n-select v-model:value="model.repairType" placeholder="可选择" :options="repairTypeOption" />
                </n-form-item>
                </div>
                <div>
                <n-form-item label="作业分类" path="repairAmount">
                    <n-select v-model:value="model.repairAmount" placeholder="可选择" :options="repairAmountOption" />
                </n-form-item>
                </div>
                <div>
                <n-form-item label="结算类型" path="jiesuan">
                    <n-select v-model:value="model.jiesuan" placeholder="可选择" :options="jiesuanOption" />
                </n-form-item>
                </div>
                <div>
                <n-form-item label="进场日期" path="inFactoryTime">
                    <n-date-picker v-model:value="timestamp1" type="date" clearable />
                </n-form-item>
                </div>
                <div>
                <n-form-item label="进场里程数" path="range">
                    <n-input v-model:value="model.range" placeholder="">
                    <template #suffix>km</template>
                    </n-input>
                </n-form-item>
                </div>
                <div>
                <n-form-item label="进场油量" path="fuelAmount">
                    <n-select v-model:value="model.fuelAmount" placeholder="可选择" :options="fuelAmountOption" />
                </n-form-item>
                </div>
                <div>
                <n-form-item label="车架号" path="frameNumber">
                    <n-input v-model:value="model.frameNumber" placeholder="" />
                </n-form-item>
                </div>
            </div>
            <div>
                <n-form-item label="故障描述" path="detailedFault">
                <n-input v-model:value="model.detailedFault" placeholder="故障描述" type="textarea" />
                </n-form-item>
            </div>
            <div class="flex justify-center">
              <n-button round type="primary" @click="handleValidateButtonClick">提交</n-button>
            </div>
          </n-form>
        </div>
      </div>

      <!-- 维修委托信息填写 -->
      <div class="flex flex-col gap-10 w-1/2">
        <div class="s-card flex flex-col p-5 space-x-2 space-y-2">
            <div class="text-lg font-semibold text-primary s-underline">{{ '填写维修派工单' }}</div>
            <n-dynamic-input v-model:value="customValue" :on-create="onCreate">
                <template #create-button-default>
                随便搞点啥
                </template>
                <template #default="{ value }">
                <div style="display: flex; align-items: center; width: 100%">
                    <n-checkbox
                    v-model:checked="value.isCheck"
                    style="margin-right: 12px"
                    />
                    <n-input-number
                    v-model:value="value.num"
                    style="margin-right: 12px; width: 160px"
                    />
                    <n-input v-model:value="value.string" type="text" />
                </div>
                </template>
            </n-dynamic-input>
        </div>

        <div class="s-card flex flex-col p-5 space-y-2 space-x-2">
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

        <div class="s-card flex flex-col p-5 space-y-2 space-x-2">
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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { FormInst, FormItemRule, useMessage } from 'naive-ui';
import { addCustomer, addVehicle } from '@/apis';
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
      licenseNumber: '',
      frameNumber: '',
      repairAmount: '',
      range: 0,
      fuelAmount: '',
      customerNameSearch: '',
      customerTypeSearch: '',
      phoneSearch: '',
      customerId: '',
      repairType:'',
      manName:'',
      detailedFault:'',
      inFactoryTime:'',
      jiesuan:'',
    });
    return {
      formRef,
      timestamp1: ref(Date.now()),
      model,
      data,
      columns,
      dataTableInst: dataTableInstRef,
      pagination: ref({ pageSize: 10 }),
      customValue: ref([
        {
          isCheck: true,
          num: 1,
          string: '一个字符串'
        }
      ]),
      repairTypeOption: ['普通', '加急'].map(v => ({
        label: v,
        value: v
      })),
      customerTypeOptions: ['单位', '个人'].map(v => ({
        label: v,
        value: v
      })),
        repairAmountOption: ['小修', '中修','大修'].map(v => ({
        label: v,
        value: v
      })),
            jiesuanOption: ['自付', '三包','进保'].map(v => ({
        label: v,
        value: v
      })),
            fuelAmountOption: ['0', '1/4','1/2','3/4','1'].map(v => ({
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
        phoneSearch: {
          required: true,
          trigger: ['blur', 'input'],
          message: '请输入联系电话'
        },
        repairType: {
          required: true,
          trigger: ['blur', 'input'],
          message: '请输入维修类型'
        },
        customerNameSearch: {
          required: true,
          trigger: ['blur', 'input'],
          message: '请输入客户名称'
        },
        repairAmount: {
          required: true,
          trigger: ['blur', 'change'],
          message: '请选择作业分类'
        },
        customerTypeSearch: {
          required: true,
          trigger: ['blur', 'change'],
          message: '请选择客户性质'
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
        manName: {
          required: true,
          trigger: ['blur', 'change'],
          message: '请填写业务员姓名'
        },
        detailedFault : {
          required: true,
          trigger: ['blur', 'change'],
          message: '请填写故障描述'
        },
        inFactoryTime: {
          required: true,
          trigger: ['blur', 'change'],
          message: '请填写进厂时间'
        },

      },
      onCreate () {
        return {
          isCheck: false,
          num: 1,
          string: '一个字符串'
        }
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
            addCustomer({
              customerName: model.value.customerName,
              customerType: model.value.customerTypeFill,
              discountRate: model.value.discountRate,
              contactPerson: model.value.contactPerson,
              phone: model.value.phone
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



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
                    <n-input v-model:value="model.customerNameSearch" clearable placeholder="请输入客户名称" />
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

        <!-- 客户信息填写 -->
        <div class="s-card flex flex-col p-5 space-x-2 space-y-2">
          <div class="text-lg font-semibold text-primary s-underline">{{ '登记客户信息' }}</div>
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
                <n-form-item label="联系人" path="contactPerson">
                  <n-input v-model:value="model.contactPerson" clearable placeholder="" />
                </n-form-item>
              </div>
              <div>
                <n-form-item label="联系电话" path="phone">
                  <n-input v-model:value="model.phone" clearable placeholder="" />
                </n-form-item>
              </div>
              <div>
                <n-form-item label="客户名称" path="customerName">
                  <n-input v-model:value="model.customerName" clearable placeholder="" />
                </n-form-item>
              </div>
              <div>
                <n-form-item label="客户性质" path="customerType">
                  <n-select v-model:value="model.customerType" clearable :options="customerTypeOptions" />
                </n-form-item>
              </div>
              <div>
                <n-form-item label="折扣率" path="discountRate">
                  <n-input v-model:value="model.discountRate" clearable placeholder="">
                    <template #suffix>%</template>
                  </n-input>
                </n-form-item>
              </div>
            </div>
            <div class="flex justify-center">
              <n-button round type="primary" @click="handleButtonClick">提交</n-button>
            </div>
          </n-form>
        </div>
      </div>

      <!-- 客户信息 -->
      <div class="s-card flex flex-col p-5 space-y-2 w-3/5">
        <div class="text-lg font-semibold text-primary s-underline">{{ '客户信息检索' }}</div>
        <n-data-table ref="dataTableInst" :columns="columns" :data="data" :pagination="pagination" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { FormInst, FormItemRule, useMessage } from 'naive-ui';
import { addCustomer, getCustomerByParams } from '@/apis';
import { onMounted } from 'vue';

const data: Ref<
  {
    customerId: number;
    customerName: string;
    customerType: string;
    discountRate: number;
    contactPerson: string;
    phone: string;
  }[]
> = ref([]);

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
    const formRef = ref<FormInst | null>(null);
    const message = useMessage();
    const model = ref({
      contactPerson: '',
      phone: '',
      phoneSearch: '',
      discountRate: 0,
      customerName: '',
      customerNameSearch: '',
      customerType: '',
      customerTypeSearch: ''
    });
    return {
      formRef,
      model,
      data,
      columns,
      dataTableInst: dataTableInstRef,
      pagination: ref({ pageSize: 8 }),
      customerTypeOptions: ['单位', '个人'].map(v => ({
        label: v,
        value: v
      })),
      rules: {
        contactPerson: {
          required: true,
          trigger: ['blur', 'input'],
          message: '请输入联系人'
        },
        phone: {
          required: true,
          trigger: ['blur', 'input'],
          message: '请输入联系电话'
        },
        customerName: {
          required: true,
          trigger: ['blur', 'input'],
          message: '请输入客户名称'
        },
        customerType: {
          required: true,
          trigger: ['blur', 'change'],
          message: '请选择客户性质'
        },
        discountRate: {
          required: true,
          trigger: ['blur', 'change'],
          message: '请填写折扣率'
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
            message.success('提交成功');
            console.log(model.value);
            addCustomer({
              customerName: model.value.customerName,
              customerType: model.value.customerType,
              discountRate: model.value.discountRate,
              contactPerson: model.value.contactPerson,
              phone: model.value.phone
            }).catch((error: any) => {
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
      multiple: 2
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
</script>
<style scoped>
</style>



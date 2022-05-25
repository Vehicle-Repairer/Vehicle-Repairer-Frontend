<template>
  <div>
    <div class="flex flex-row gap-10 w-full">
      <div class="flex flex-col gap-10 w-1/2">
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
            <div class="grid grid-cols-3 gap-4">
              <div>
                <n-form-item label="编号" path="id">
                  <n-input v-model:value="model.id" :disabled="!active" placeholder=""/>
                </n-form-item>
              </div>
              <div>
                <n-form-item label="姓名" path="manName">
                  <n-input v-model:value="model.manName" placeholder="" />
                </n-form-item>
              </div>
              <div>
                <n-form-item label="性别" path="sex">
                  <n-input v-model:value="model.sex" placeholder="" />
                </n-form-item>
              </div>
              <div>
                <n-form-item label="手机号" path="phone">
                  <n-input v-model:value="model.phone" placeholder="" />
                </n-form-item>
              </div>
              <div>
                <n-form-item label="出生日期" path="birthday">
                  <n-input v-model:value="model.birthday" placeholder="" />
                </n-form-item>
              </div>
              <div>
                <n-form-item label="地址" path="address">
                  <n-input v-model:value="model.address" placeholder="" />
                </n-form-item>
              </div>
              <div>
                <n-form-item label="邮箱" path="emailAddress">
                  <n-input v-model:value="model.emailAddress" placeholder="" />
                </n-form-item>
              </div>
              <div>
                <n-form-item label="入职日期" path="createdTime">
                  <n-input v-model:value="model.createdTime" :disabled="!active" placeholder="" />
                </n-form-item>
              </div>
              <div>
                <n-form-item label="工种" path="profession">
                  <n-input v-model:value="model.profession" placeholder="" />
                </n-form-item>
              </div>
              <div>
                <n-form-item label="工时单价" path="hourCost">
                  <n-input v-model:value="model.hourCost" placeholder="" />
                </n-form-item>
              </div>
            </div>
            <div class="flex justify-center">
              <n-button round type="primary" @click="handleButtonClick">保存修改</n-button>
            </div>
          </n-form>
        </div>
      </div>

      <div class="flex flex-col gap-10 w-1/2">
        <div class="s-card flex flex-col p-5 space-y-2">
          <div class="text-lg font-semibold text-primary s-underline">{{ '我的维修工单' }}</div>
          <n-data-table ref="dataTableInst" :columns="columns" :data="data" :pagination="pagination" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { FormInst, FormItemRule, useMessage } from 'naive-ui';
import { getAssignment, getMyInfo, modifyInfo, getRepairItems, finishAssignment } from '@/apis';
import { onMounted } from 'vue';

const data: Ref<
  {
    assignmentId: number;
    frameNumber: string;
    repairItem: string;
    repairType: string;
    repairTime: string;
    detailedFault: string;
    isFinished: string;
  }[]
> = ref([]);



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
              model.value.createdTime = res.me.createdTime.slice(0,10);
              model.value.profession = res.me.profession;
              model.value.hourCost = res.me.hourCost;
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
      data,
      columns,

      active: ref(false),
      dataTableInst: dataTableInstRef,
      pagination: ref({ pageSize: 10 }),
      paginationItem: ref({ pageSize: 5 }),
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
        },
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
            message.success('提交成功');
            console.log(model.value);
            modifyInfo({
              birthday: model.value.birthday,
              hourCost: model.value.hourCost,
              manName: model.value.manName,
              profession: model.value.profession,
              sex: model.value.sex,
              phone: model.value.phone,
              address: model.value.address,
              emailAddress: model.value.emailAddress
            }).catch((error: any) => {
              console.log(error);
            });
          } else {
            console.log(errors);
            message.error('提交失败');
          }
        });
      },
      finishButtonClick(e: MouseEvent) {
        message.success('提交成功');
        console.log(model.value);
        finishAssignment({
          assignmentId: model.value.assignmentId,
          isFinished: model.value.isFinished
        }).catch((error: any) => {
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

</script>
<style scoped>
</style>



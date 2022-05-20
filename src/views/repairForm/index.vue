<template>
  <div>
    <div class="flex flex-col gap-10">
      <!-- 客户车辆信息填写 -->
      <div class="s-card flex flex-col p-5 space-y-2">
        <div class="text-lg font-semibold text-primary s-underline">{{ '客户及车辆信息' }}</div>
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
              <n-form-item label="客户编号" path="inputValue">
                <n-input v-model:value="model.inputValue" placeholder="" />
              </n-form-item>
            </div>
            <div>
              <n-form-item label="联系人" path="inputlxr">
                <n-input v-model:value="model.inputlxr" placeholder="" />
              </n-form-item>
            </div>
            <div>
              <n-form-item label="联系电话" path="inputlxdh">
                <n-input v-model:value="model.inputlxdh" placeholder="" />
              </n-form-item>
            </div>
            <div>
              <n-form-item label="客户名称" path="textareaValue">
                <n-input
                  v-model:value="model.textareaValue"
                  placeholder=""
                  type="textarea"
                  :autosize="{
                    minRows: 1,
                    maxRows: 1
                  }"
                />
              </n-form-item>
            </div>
            <div>
              <n-form-item label="客户性质" path="selectValue">
                <n-select v-model:value="model.selectValue" placeholder="可选择" :options="generalOptions" />
              </n-form-item>
            </div>
            <div>
              <n-form-item label="折扣率" path="account">
                <n-input v-model:value="model.account" placeholder="">
                  <template #suffix>%</template>
                </n-input>
              </n-form-item>
            </div>
            <div>
              <n-form-item label="车牌号" path="multipleSelectValue">
                <n-input v-model:value="model.multipleSelectValue" placeholder="" />
              </n-form-item>
            </div>
            <div>
              <n-form-item label="车架号" path="chejia">
                <n-input v-model:value="model.chejia" placeholder="" />
              </n-form-item>
            </div>
            <div>
              <n-form-item label="车型" path="chexing">
                <n-input v-model:value="model.chexing" placeholder="" />
              </n-form-item>
            </div>
            <div>
              <n-form-item label="车辆颜色" path="color">
                <n-input v-model:value="model.color" placeholder="" />
              </n-form-item>
            </div>
            <div>
              <n-form-item label="车辆类型" path="radioGroupValue">
                <n-radio-group v-model:value="model.radioGroupValue" name="radiogroup1">
                  <n-space>
                    <n-radio value="微型车">微型车</n-radio>
                    <n-radio value="小型车">小型车</n-radio>
                    <n-radio value="中型车">中型车</n-radio>
                    <n-radio value="重型车">重型车</n-radio>
                  </n-space>
                </n-radio-group>
              </n-form-item>
            </div>
          </div>
          <div class="flex justify-center">
            <n-button round type="primary" @click="handleValidateButtonClick">提交</n-button>
          </div>
        </n-form>
      </div>

      <!-- 维修委托信息填写 -->
      <div class="s-card flex flex-col p-5 space-y-2">
        <div class="text-lg font-semibold text-primary s-underline">{{ '维修委托申请' }}</div>
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
              <n-form-item label="车牌号" path="multipleSelectValue">
                <n-input v-model:value="model.multipleSelectValue" placeholder="" />
              </n-form-item>
            </div>
            <div>
              <n-form-item label="客户编号" path="inputValue">
                <n-input v-model:value="model.inputValue" placeholder="" />
              </n-form-item>
            </div>
            <div>
              <n-form-item label="业务员" path="ywy">
                <n-input v-model:value="model.ywy" placeholder="" />
              </n-form-item>
            </div>
            <div>
              <n-form-item label="业务员编号" path="ywynum">
                <n-input v-model:value="model.ywynum" placeholder="" />
              </n-form-item>
            </div>
            <div>
              <n-form-item label="维修类型" path="wxlx">
                <n-radio-group v-model:value="model.wxlx" name="wxlx">
                  <n-space>
                    <n-radio value="Radio 1">普通</n-radio>
                    <n-radio value="Radio 2">加急</n-radio>
                  </n-space>
                </n-radio-group>
              </n-form-item>
            </div>
            <div>
              <n-form-item label="作业分类" path="zyfenlei">
                <n-select v-model:value="model.zyfenlei" placeholder="可选择" :options="zy" />
              </n-form-item>
            </div>
            <div>
              <n-form-item label="结算类型" path="jiesuan">
                <n-select v-model:value="model.jiesuan" placeholder="可选择" :options="jiesuan" />
              </n-form-item>
            </div>
            <div>
              <n-form-item label="进场日期" path="jctime">
                <n-date-picker v-model:value="timestamp1" type="date" clearable />
              </n-form-item>
            </div>
            <div>
              <n-form-item label="预计完工日期" path="wgtime">
                <n-date-picker v-model:value="timestamp2" type="date" clearable />
              </n-form-item>
            </div>
            <div>
              <n-form-item label="进场里程数" path="km">
                <n-input v-model:value="model.km" placeholder="">
                  <template #suffix>km</template>
                </n-input>
              </n-form-item>
            </div>
            <div>
              <n-form-item label="进场油量" path="oil">
                <n-select v-model:value="model.oil" placeholder="可选择" :options="oil" />
              </n-form-item>
            </div>
            <div>
              <n-form-item label="车架号" path="chejia">
                <n-input v-model:value="model.chejia" placeholder="" />
              </n-form-item>
            </div>
          </div>
          <div>
            <n-form-item label="故障描述" path="err">
              <n-input v-model:value="model.err" placeholder="故障描述" type="textarea" />
            </n-form-item>
          </div>
          <div class="flex justify-center">
            <n-button round type="primary" @click="handleValidateButtonClick">提交</n-button>
          </div>
        </n-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { FormInst, FormItemRule, useMessage } from 'naive-ui';
import { addCustomer, addVehicle } from '@/apis';
import { mode } from 'crypto-js';
export default defineComponent({
  setup() {
    const formRef = ref<FormInst | null>(null);
    const message = useMessage();
    const model = ref({
      inputValue: null,
      inputlxr: '',
      inputlxdh: '',
      account: 0,
      chexing: '',
      chejia: '',
      textareaValue: '',
      color: '',
      selectValue: '',
      multipleSelectValue: '',
      datetimeValue: null,
      switchValue: false,
      checkboxGroupValue: null,
      radioGroupValue: '',
      radioButtonGroupValue: null,
      inputNumberValue: null,
      ywy: null,
      ywynum: null,
      km: null,
      oil: null,
      jctime: null,
      ts1: ref(null),
      jiesuan: null,
      err: null,
      wxlx: null,
      zyfenlei: null
    });
    return {
      formRef,
      timestamp1: ref(Date.now()),
      timestamp2: ref(),
      model,
      generalOptions: ['单位', '个人'].map(v => ({
        label: v,
        value: v
      })),
      wxlx: ['普通', '加急'].map(v => ({
        label: v,
        value: v
      })),
      zy: ['大修', '中修', '小修'].map(v => ({
        label: v,
        value: v
      })),
      jiesuan: ['自付', '三包', '进保'].map(v => ({
        label: v,
        value: v
      })),
      oil: ['1/4', '1/2', '3/4', '1'].map(v => ({
        label: v,
        value: v
      })),
      rules: {
        inputValue: {
          required: true,
          trigger: ['blur', 'input'],
          message: '请输入客户编号'
        },
        inputlxr: {
          required: true,
          trigger: ['blur', 'input'],
          message: '请输入联系人'
        },
        inputlxdh: {
          required: true,
          trigger: ['blur', 'input'],
          message: '请输入联系电话'
        },
        textareaValue: {
          required: true,
          trigger: ['blur', 'input'],
          message: '请输入客户名称'
        },
        selectValue: {
          required: true,
          trigger: ['blur', 'change'],
          message: '请选择客户性质'
        },
        account: {
          required: true,
          trigger: ['blur', 'change'],
          message: '请填写折扣率'
        },
        multipleSelectValue: {
          required: true,
          trigger: ['blur', 'change'],
          message: '请填写车牌号'
        },
        chejia: {
          required: true,
          trigger: ['blur', 'input'],
          message: '请输入车架号'
        },
        chexing: {
          required: true,
          trigger: ['blur', 'input'],
          message: '请输入车型'
        },
        color: {
          required: true,
          trigger: ['blur', 'input'],
          message: '请输入车辆颜色'
        },
        err: {
          required: true,
          trigger: ['blur', 'input'],
          message: '请输入故障'
        },
        wxlx: {
          required: true,
          trigger: ['blur', 'change'],
          message: '请选择维修性质'
        },
        zyfenlei: {
          required: true,
          trigger: ['blur', 'change'],
          message: '请选择作业类型'
        }
      },
      handleValidateButtonClick(e: MouseEvent) {
        e.preventDefault();
        formRef.value?.validate(errors => {
          if (!errors) {
            message.success('提交成功');
            console.log(model.value);
            addCustomer({
              customerName: model.value.textareaValue,
              customerType: model.value.selectValue,
              discountRate: model.value.account,
              contactPerson: model.value.inputlxr,
              phone: model.value.inputlxdh
            })
              .then((res: { customerId: number }) => {
                addVehicle({
                  frameNumber: model.value.chejia,
                  licenseNumber: model.value.multipleSelectValue,
                  customerId: res.customerId,
                  color: model.value.color,
                  vehicleModel: model.value.chexing,
                  vehicleType: model.value.radioGroupValue
                }).then((response:any)=>{
                  console.log(response);
                });
              })
              .catch((error: any) => {
                console.log(error);
              });
          } else {
            console.log(errors);
            message.error('提交失败');
          }
        });
      }
    };
  }
});
</script>
<style scoped>
</style>



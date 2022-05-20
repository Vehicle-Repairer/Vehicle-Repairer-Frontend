<template>
<div class="flex flex-row w-full gap-5">

    <div class="s-card w-2/3 p-6 space-y-2">
        <div class="text-lg font-semibold text-primary s-underline">{{ '我的工单' }}</div>
        <n-data-table
            size="large"
            :columns="columns"
            :data="data"
            :pagination="pagination"
        />
    </div>

    <div class="s-card w-1/3 p-6 space-y-2">
        <n-form
        ref="formRef"
        :model="model"

        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging"
        >
        <n-form-item label="客户编号" path="inputValue">
        <n-input v-model:value="model.inputValue" placeholder="" />
        </n-form-item>


        <n-form-item label="材料1" path="num1">
            <n-input-number v-model:value="model.num1" />
        </n-form-item>
            <n-form-item label="材料2" path="num2">
            <n-input-number v-model:value="model.num2" />
        </n-form-item>
            <n-form-item label="材料3" path="num3">
            <n-input-number v-model:value="model.num3" />
        </n-form-item>
            <n-form-item label="材料4" path="num4">
            <n-input-number v-model:value="model.num4" />
        </n-form-item>
            <n-form-item label="材料5" path="num5">
            <n-input-number v-model:value="model.num5" />
        </n-form-item>

        </n-form>
        <div style="display: flex; justify-content: flex-mid">
        <n-button round type="primary" @click="handleValidateButtonClick">
            提交
        </n-button>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import { h, defineComponent,ref } from 'vue'
import { NTag, NButton, useMessage } from 'naive-ui'
import { FormInst, FormItemRule, } from 'naive-ui'

const createColumns = ({ sendMail }) => {
  return [
    {
      title: '维修项目编号',
      key: 'name'
    },
    {
      title: '维修项目',
      key: 'age'
    },
    {
      title: '工时',
      key: 'address'
    },
    {
      title: '维修状态',
      key: 'status'
    },
    {
      title: '操作',
      key: 'actions',
      render (row) {
        return h(
          NButton,
          {
            size: 'small',
            onClick: () => sendMail(row)
          },
          { default: () => '完成维修' }
        )
      }
    }
  ]
}

const createData = () => [
  {
    key: 0,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: 1,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  }
]

export default defineComponent({
  setup () {
    const message = useMessage()
    const formRef = ref<FormInst | null>(null)

    return {


      formRef,
      model: ref({

      inputValue: null,
      num1: null,
      num2: null,
      num3: null,
      num4: null,
      num5: null,

      }),
      handleValidateButtonClick (e: MouseEvent) {
        e.preventDefault()
        formRef.value?.validate((errors) => {
          if (!errors) {
            message.success('提交成功')
          } else {
            console.log(errors)
            message.error('提交失败')
          }
        })
      },
      data: createData(),
      columns: createColumns({
        sendMail (rowData) {
          message.info('send mail to ' + rowData.name)
        }
      }),
      pagination: {
        pageSize: 10
      }
    }
  }
})
</script>
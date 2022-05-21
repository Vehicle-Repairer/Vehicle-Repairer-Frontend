<template>
    <div class="s-card p-6 space-y-2">
        <div class="text-lg font-semibold text-primary s-underline">{{ '我的订单' }}</div>
        <n-data-table
            size="large"
            :columns="columns"
            :data="data"
            :pagination="pagination"
        />
    </div>

</template>

<script lang="ts">
import { h, defineComponent } from 'vue'
import { NTag, NButton, useMessage } from 'naive-ui'

const createColumns = ({ sendMail }) => {
  return [
    {
      title: '客户编号',
      key: 'name'
    },
    {
      title: '车架号',
      key: 'age'
    },
    {
      title: '维修类型',
      key: 'address'
    },
    {
      title: '联系电话',
      key: 'phone'
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
          { default: () => '修改' }
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
    return {
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

<template>
    <div class="s-card flex flex-col gap-5">
        <!-- 搜索栏 -->
        <div class="grid grid-cols-4 p-6 space-x-10">
            <div class="space-y-2">
                <div class="text-lg font-semibold text-primary s-underline ">{{ '表单类型' }}</div>
                <div>
                    <n-select v-model:value="value" :options="options" />
                </div>
            </div>
            <div class="space-y-2">
                <div class="text-lg font-semibold text-primary s-underline ">{{ '客户编号' }}</div>
                <div>
                    <n-input type="text" placeholder="可以清除" clearable />
                </div>
            </div>
            <div class="space-y-2">
                <div class="text-lg font-semibold text-primary s-underline ">{{ '车架号' }}</div>
                <div>
                    <n-input type="text" placeholder="可以清除" clearable />
                </div>
            </div>
            <div class="space-y-2 place-self-center">
                <div>
                <n-button type="info">
                    查询
                </n-button>
                </div>
                <div>
                <n-button type="info">
                    重置
                </n-button>
                </div>
            </div>
        </div>


        <div class="p-6">
            <n-table :single-line="false">
                <thead>
                <tr>
                    <th>客户编号</th>
                    <th>车架号</th>
                    <th>业务员编号</th>
                    <th>维修状态</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>GS0551</td>
                    <td>*****</td>
                    <td>012</td>
                    <td>已申请</td>
                    <td>
                        <n-button round type="primary">
                            详情
                        </n-button>
                        <n-button round type="primary">
                            修改
                        </n-button>
                    </td>
                </tr>
                </tbody>
            </n-table>
        </div>


        <div class="p-6 flex justify-end">
            <n-pagination
            v-model:page="page"
            :page-count="10"
            size="small"
            show-quick-jumper
            show-size-picker
            />
        </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

const columns = [
  {
    title: '客户编号',
    key: 'name'
  },
  {
    title: '车架号',
    key: 'age',
    sorter: (row1, row2) => row1.age - row2.age
  },
  {
    title: '业务员编号',
    key: 'chinese',
    defaultSortOrder: false,
    sorter: {
      compare: (a, b) => a.chinese - b.chinese,
      multiple: 3
    }
  },
  {
    title: '维修状态',
    defaultSortOrder: false,
    key: 'math',
  },
  {
    title: 'Action',
    key: 'actions',

  }
]

const data = [
  {
    key: 0,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    chinese: 98,
    math: 60,
    english: 70
  },
  {
    key: 1,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    chinese: 98,
    math: 66,
    english: 89
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    chinese: 98,
    math: 66,
    english: 89
  },
  {
    key: 3,
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
    chinese: 88,
    math: 99,
    english: 89
  }
]


export default defineComponent({
  setup () {
    const dataTableInstRef = ref()
    return {
        page:ref(2),
      value: ref(null),
            options: [
        {
          label: '客户信息表单',
          value: 'customForm'
        },
        {
          label: '维修派工单',
          value: 'repairForm'
        }
      ],
      data,
      columns,
      dataTableInst: dataTableInstRef,
      pagination: ref({ pageSize: 5 }),
      filterAddress () {
        dataTableInstRef.value.filter({
          address: ['London']
        })
      },
      sortName () {
        dataTableInstRef.value.sort('name', 'ascend')
      },
      clearFilters () {
        dataTableInstRef.value.filter(null)
      },
      clearSorter () {
        dataTableInstRef.value.sort(null)
      }
    }
  }
})
</script>

<style scoped>

</style>
<template>
  <div class="editable-table2">
    <pre><code>
  简化 el-table 重复代码, 最少仅需要一行代码即可

  支持 单行文本, 文本域, 整数, 小数, 选择器; 并且支持这些组件的 Attributes 和 Slots

  Attributes:

    支持 el-table 全部 Attributes

    columns: Array

      字段说明:

      label: el-table label

      prop: el-table prop

      type: 取值范围: ['text', 'textarea', 'integer', 'decimal', 'select']

      select: type 为 select 必填, 选择器数据

      component: 组件名称

      editable: 是否可编辑

      focus: 聚焦

      slots: 当前组件的 slot

      其他字段: 参见 el-table

    focusRow: 聚焦行 index

    focusCol: 聚焦列 index

  Slots:

    prev: 前置 slot

    -: 后置 slot

  <el-link
      type="primary"
      :underline="false"
      href="https://github.com/HenryTSZ/vue-element-extend/blob/master/src/plugins/BaseForm.vue"
      target="_blank"
      >源码</el-link>

    </code></pre>
    <base-table
      :data="data"
      :columns="columns"
      :focus-row="focusRow"
      :focus-col="focusCol"
    ></base-table>
  </div>
</template>

<script>
import { findVal } from 'utils'
export default {
  name: 'EditableTable2',
  components: { BaseTable: resolve => require(['plugins/BaseTable'], resolve) },
  data() {
    const addressMap = [
      {
        label: '上海市普陀区金沙江路 1519 弄',
        value: '1519'
      },
      {
        label: '上海市普陀区金沙江路 1518 弄',
        value: '1518'
      },
      {
        label: '上海市普陀区金沙江路 1517 弄',
        value: '1517'
      },
      {
        label: '上海市普陀区金沙江路 1516 弄',
        value: '1516'
      }
    ]
    return {
      data: [
        {
          name: '王小虎',
          age: 19,
          money: 19.99,
          address: '1519'
        },
        {
          name: '王小虎',
          age: 18,
          money: 18.99,
          address: '1518'
        },
        {
          name: '王小虎',
          age: 17,
          money: 17.99,
          address: '1517'
        },
        {
          name: '王小虎',
          age: 16,
          money: 16.99,
          address: '1516'
        }
      ],
      columns: [
        { label: '名字', prop: 'name', type: 'text', component: 'el-input' },
        { label: '年龄', prop: 'age', type: 'integer', component: 'number-input', editable: true },
        { label: '资产', prop: 'money', type: 'decimal', component: 'number-input' },
        {
          label: '住址',
          prop: 'address',
          type: 'select',
          component: 'el-select',
          editable: true,
          select: addressMap,
          formatter(row) {
            return findVal(addressMap, row.address)
          }
        }
      ],
      focusRow: 1,
      focusCol: 1
    }
  },
  mounted() {
    setTimeout(() => {
      this.focusCol = 3
    }, 2000)
  }
}
</script>

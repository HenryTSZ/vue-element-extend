<template>
  <div class="editable-table2">
    <pre><code>
  简化 el-table 重复代码, 最少仅需要一行代码即可

  支持 单行文本、文本域、Switch 开关、选择器等 ElementUI form 大部分组件和本项目自定义组件: 整数、小数、SelectTree;

  并且支持这些组件的 Attributes 和 Slots

  Attributes:

    支持 el-table 全部 Attributes

    columns: Array

      字段说明:

      label: el-table label

      prop: el-table prop

      keyProps: 映射 label 和 prop, 默认为 { label: 'label', prop: 'prop' }

      editable: 是否可编辑整列

      editableFun: 自定义某行某列是否可编辑. Function(row, column, cellValue, index), 返回值为 Boolean

          具体可参见如下例子: 年龄大于 17 才可选择地址

      component: editable 为 true 或有 editableFun 函数 时, 必填

      其余参见 <el-link
      type="primary"
      :underline="false"
      href="#/element-ui/EditableElementsDemo"
      >EditableElementsDemo</el-link>

      其他字段: 参见 el-table

    focusRow: 聚焦行 index

    focusCol: 聚焦列 index

  Slots:

    prev: 前置 slot

    -: 后置 slot

  Events:

    row-change: 当前行的可编辑列值发生变化. 参数: row: 当前行, value: 列的 value, key: 列的 key

    blur-change: 当前行的可编辑列失焦. 参数: row: 当前行, e: event, key: 列的 key

    visible-change: 列的下拉框出现/隐藏时触发, 解决 el-select 多选的时候, 选中一个值就触发 change 事件. 参数: row: 当前行, visible: 出现则为 true，隐藏则为 false, key: 列的 key

  具体实现请移步 <el-link
      type="primary"
      :underline="false"
      href="https://tsz.now.sh/2020/05/16/based-on-element-ui-encapsulation-table-form/"
      target="_blank"
      >基于 ElementUI 封装的基础 table 和 form | Henry</el-link
    >

  <el-link
      type="primary"
      :underline="false"
      href="https://github.com/HenryTSZ/vue-element-extend/blob/master/src/plugins/BaseTable.vue"
      target="_blank"
      >源码</el-link>       <el-link
    type="primary"
    :underline="false"
    href="https://github.com/HenryTSZ/vue-element-extend/blob/master/src/components/element-ui/BaseTableDemo.vue"
    target="_blank"
  >Demo 示例</el-link>

    </code></pre>
    <base-table
      :data="data"
      :columns="columns"
      :focus-row="focusRow"
      :focus-col="focusCol"
      @change="change"
      @row-change="rowChange"
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
        {
          label: '年龄',
          prop: 'age',
          type: 'integer',
          component: 'number-input',
          editable: true,
          events: { input: this.input }
        },
        { label: '资产', prop: 'money', type: 'decimal', component: 'number-input' },
        {
          label: '住址',
          prop: 'address',
          type: 'select',
          component: 'el-select',
          editableFun(row) {
            return row.age > 17
          },
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
  methods: {
    input(e) {
      console.log('input -> e', e)
    },
    change(e) {
      console.log('change -> e', e)
    },
    rowChange(row, e, prop) {
      console.log('rowChange -> row, e, prop', row, e, prop)
    }
  },
  mounted() {
    setTimeout(() => {
      this.focusCol = 3
    }, 2000)
  }
}
</script>

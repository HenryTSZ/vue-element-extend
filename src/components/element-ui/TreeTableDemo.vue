<template>
  <div class="tree-table-demo">
    <pre><code>
  在保持 el-table 全部功能的基础上增加了全选可以选中子级和展开到 level 级的功能

  1. 全选功能 prop:

    check-strictly: Boolean, 同 el-tree, 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false

    check-all: Boolean, 点击表头的多选框时, 是否影响全部数据, 默认为 true

  2. 展开到 level 级 prop:

    level, Number: 0: 展开全部, 1: 展开到一级, ...

    refreshLevel, [String, Number]: 重新渲染展开折叠, 有时候在 level 不变的情况下需要重新渲染展开折叠

  3. 其余参见 <el-link
      type="primary"
      :underline="false"
      href="#/element-ui/BaseTableDemo"
      >BaseTableDemo</el-link>

  4. 其余所有 props / Event / 方法 均与 el-table 一样

  5. 具体实现请移步 <el-link
      type="primary"
      :underline="false"
      href="https://tsz.now.sh/2020/04/04/based-on-element-ui-encapsulation-tree-table/"
      target="_blank"
      >基于 ElementUI 封装的 TreeTable | Henry</el-link
    >

  6. <el-link
      type="primary"
      :underline="false"
      href="https://github.com/HenryTSZ/vue-element-extend/blob/master/src/plugins/TreeTable.vue"
      target="_blank"
      >源码</el-link>       <el-link
      type="primary"
      :underline="false"
      href="https://github.com/HenryTSZ/vue-element-extend/blob/master/src/components/element-ui/TreeTableDemo.vue"
      target="_blank"
    >Demo 示例</el-link>

    </code></pre>
    展开到 <el-input-number v-model="level" :min="0" :max="maxLevel"></el-input-number> 级
    check-strictly:
    <el-switch v-model="checkStrictly" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
    check-all:
    <el-switch v-model="checkAll" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
    <tree-table
      :data="tableData"
      :columns="columns"
      row-key="id"
      default-expand-all
      :level="level"
      :check-strictly="checkStrictly"
      :check-all="checkAll"
      @max-level="level => (maxLevel = level)"
      @select="select"
      @select-all="selectAll"
      @selection-change="selectionChange"
      @row-change="rowChange"
    >
      <el-table-column type="selection" slot="prev"></el-table-column>
    </tree-table>
  </div>
</template>

<script>
import TreeTable from 'plugins/TreeTable'
export default {
  name: 'TreeTableDemo',
  components: { TreeTable },
  data() {
    return {
      tableData: [],
      columns: [
        { label: '日期', prop: 'date' },
        { label: '姓名', prop: 'name', editable: true, component: 'el-input' },
        { label: '地址', prop: 'address' }
      ],
      level: 1,
      maxLevel: 1,
      checkStrictly: true,
      checkAll: true
    }
  },
  methods: {
    select(selection, row) {
      console.log('select -> selection, row', selection, row.id)
    },
    selectAll(selection) {
      console.log('selectAll -> selection', selection)
    },
    selectionChange(selection) {
      console.log('selectionChange -> selection', selection)
    },
    rowChange(row, e, prop) {
      console.log('rowChange -> row, e, prop', row, e, prop)
    }
  },
  mounted() {
    setTimeout(() => {
      this.tableData = [
        {
          id: 1,
          date: '2016-05-02',
          name: '王小虎-1',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id: 2,
          date: '2016-05-04',
          name: '王小虎-2',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          id: 3,
          date: '2016-05-01',
          name: '王小虎-3',
          address: '上海市普陀区金沙江路 1519 弄',
          children: [
            {
              id: 31,
              date: '2016-05-01',
              name: '王小虎-31',
              address: '上海市普陀区金沙江路 1519 弄',
              children: [
                {
                  id: 311,
                  date: '2016-05-01',
                  name: '王小虎-311',
                  address: '上海市普陀区金沙江路 1519 弄',
                  children: [
                    {
                      id: 3111,
                      date: '2016-05-01',
                      name: '王小虎-3111',
                      address: '上海市普陀区金沙江路 1519 弄'
                    },
                    {
                      id: 3112,
                      date: '2016-05-01',
                      name: '王小虎-3112',
                      address: '上海市普陀区金沙江路 1519 弄'
                    }
                  ]
                },
                {
                  id: 312,
                  date: '2016-05-01',
                  name: '王小虎-312',
                  address: '上海市普陀区金沙江路 1519 弄',
                  children: [
                    {
                      id: 3121,
                      date: '2016-05-01',
                      name: '王小虎-3121',
                      address: '上海市普陀区金沙江路 1519 弄'
                    },
                    {
                      id: 3122,
                      date: '2016-05-01',
                      name: '王小虎-3122',
                      address: '上海市普陀区金沙江路 1519 弄'
                    }
                  ]
                }
              ]
            },
            {
              id: 32,
              date: '2016-05-01',
              name: '王小虎-32',
              address: '上海市普陀区金沙江路 1519 弄'
            }
          ]
        },
        {
          id: 4,
          date: '2016-05-03',
          name: '王小虎-4',
          address: '上海市普陀区金沙江路 1516 弄',
          children: [
            {
              id: 41,
              date: '2016-05-01',
              name: '王小虎-41',
              address: '上海市普陀区金沙江路 1519 弄'
            },
            {
              id: 42,
              date: '2016-05-01',
              name: '王小虎-42',
              address: '上海市普陀区金沙江路 1519 弄'
            }
          ]
        }
      ]
    }, 1000)
  }
}
</script>

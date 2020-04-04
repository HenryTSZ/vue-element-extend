<template>
  <div class="tree-table-demo">
    <pre><code>
  在保持 el-table 全部功能的基础上增加了全选可以选中子级和展开到 level 级的功能

  1. 全选功能 prop: show-check-all(需配合 show-checkbox), Boolean

  2. 展开到 level 级 prop: level, Number: 0: 展开全部, 1: 展开到一级, ...

  3. 其余所有 props / Event / 方法 均与 el-table 一样

  4. 具体实现请移步 <el-link
      type="primary"
      :underline="false"
      href="https://tsz.now.sh/2020/04/04/based-on-element-ui-encapsulation-tree-table/"
      target="_blank"
      >基于 ElementUI 封装的 TreeTable | Henry</el-link
    >

  5. <el-link
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
    <el-input-number v-model="level" :min="0" :max="maxLevel"></el-input-number>
    <tree-table
      :data="tableData"
      row-key="id"
      default-expand-all
      :level="level"
      @max-level="level => (maxLevel = level)"
    >
      <el-table-column prop="date" label="日期" sortable width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" sortable width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </tree-table>
  </div>
</template>

<script>
import TreeTable from 'plugins/TreeTable'
export default {
  name: 'TreeTableDemo',
  components: { TreeTable },
  props: {},
  data() {
    return {
      tableData: [
        {
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          children: [
            {
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄',
              children: [
                {
                  id: 311,
                  date: '2016-05-01',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1519 弄',
                  children: [
                    {
                      id: 3111,
                      date: '2016-05-01',
                      name: '王小虎',
                      address: '上海市普陀区金沙江路 1519 弄'
                    },
                    {
                      id: 3112,
                      date: '2016-05-01',
                      name: '王小虎',
                      address: '上海市普陀区金沙江路 1519 弄'
                    }
                  ]
                },
                {
                  id: 312,
                  date: '2016-05-01',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1519 弄'
                }
              ]
            },
            {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }
          ]
        },
        {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          children: [
            {
              id: 41,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            },
            {
              id: 42,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }
          ]
        }
      ],
      level: 1,
      maxLevel: 1
    }
  },
  computed: {},
  watch: {},
  methods: {
    init() {}
  },
  created() {
    this.init()
  },
  mounted() {}
}
</script>

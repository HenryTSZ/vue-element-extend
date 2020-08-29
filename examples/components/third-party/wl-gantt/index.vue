<template>
  <div class="wl-gantt-demo">
    <wl-gantt
      :data="data"
      row-key="id"
      default-expand-all
      date-type="yearAndMonth"
      start-date="2019-9-06"
      end-date="2019-10-31"
      @timeChange="timeChange"
      @preChange="preChange"
      @expand-change="expandChange"
    >
      <template slot="prv">
        <el-table-column
          label="isd"
          min-width="200"
          show-overflow-tooltip
          prop="ids"
        ></el-table-column>
      </template>
    </wl-gantt>
  </div>
</template>

<script>
export default {
  name: 'WlGanttDemo',
  data() {
    return {
      data: [
        {
          id: '1',
          pid: '0',
          name: '旅行',
          startDate: '2019-09-07',
          realStartDate: '2019-09-10',
          endDate: '2019-10-31',
          realEndDate: '2019-10-19',
          children: [
            {
              id: '1-1',
              pid: '1',
              name: '云台之间',
              startDate: '2019-09-10',
              endDate: '2019-09-13',
              children: [
                {
                  id: '1-1-1',
                  pid: '1-1',
                  name: '日落云巅',
                  startDate: '2019-09-10',
                  endDate: '2019-09-13'
                }
              ]
            },
            {
              id: '1-2',
              pid: '1',
              name: '天空之镜',
              startDate: '2019-09-17',
              endDate: '2019-09-22'
            },
            {
              id: '1-3',
              name: '蓬莱之岛',
              pid: '1',
              startDate: '2019-09-25',
              endDate: '2019-09-30'
            },
            {
              id: '1-4',
              pid: '1',
              name: '西塘之南',
              startDate: '2019-10-03',
              endDate: '2019-10-07'
            },
            {
              pid: '1',
              id: '1-5',
              name: '凤凰之缘',
              startDate: '2019-10-11',
              endDate: '2019-10-19'
            }
          ]
        },
        {
          id: '2',
          name: '租房子',
          startDate: '2019-09-20',
          endDate: '2019-10-31'
        }
      ]
    }
  },
  methods: {
    /**
     * 时间发生更改
     * row: Object 当前行数据c
     */
    timeChange(row) {
      console.log('时间修改:', row)
    },
    //
    /**
     * 前置任务发生更改
     * row: Object 当前行数据
     * oldval: [String, Array] 前置修改前的旧数据
     * handle: Boolean 是否用户编辑产生的改变
     */
    preChange(row, oldval, handle) {
      console.log('前置修改:', row, oldval, handle)
    },
    // 数表展开行
    expandChange(row, expanded) {
      console.log('展开行:', row, expanded)
    }
  }
}
</script>

<style lang="less">
.wl-gantt-demo {
  margin: 40px auto;
}
</style>

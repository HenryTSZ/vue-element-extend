<!--
 * @Author: HenryTSZ
 * @Date: 2018-10-27 11:05:45
 * @Description:
 * @LastEditors: HenryTSZ
 * @LastEditTime: 2020-08-25 14:08:39
-->
<template>
  <div class="base-chart">
    <el-row :gutter="20">
      <el-col :span="12" class="chart-col" v-for="item in pies" :key="item.id">
        <pie-chart :options="item.pie"></pie-chart>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'ProgressLineChart',
  mixins: [],
  props: {},
  data() {
    return {
      pies: [
        {
          id: 1,
          pie: {
            text: '45%\t\n完成率',
            titleTop: '37%',
            textColor: '#2e8a00',
            textSize: 30,
            data: 45,
            status: '正常',
            // dataSize: 20,
            // statusSize: 25,
            hideName: true
          }
        }
      ]
    }
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {}
}
</script>

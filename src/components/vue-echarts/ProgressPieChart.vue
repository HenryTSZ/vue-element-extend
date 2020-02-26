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
import PieChart from 'plugins/ProgressPieChart'
export default {
  name: 'ProgressLineChart',
  components: { PieChart },
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

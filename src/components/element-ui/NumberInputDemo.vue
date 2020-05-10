<!--
 * @Author: HenryTSZ
 * @Date: 2020-05-10 10:06:07
 * @Description:
 * @LastEditors: HenryTSZ
 * @LastEditTime: 2020-05-10 17:47:37
 -->
<template>
  <div class="number-input-demo">
    <pre><code>
  基于 el-input 封装的只能输入数字的组件

  Attributes:

    v-model / value: value 值

    type: integer 整数, decimal 小数(包括整数). 默认小数

    signed: plus 正数, minus: 负数, all: 全部. 默认正数

    places: 保留小数位数. 默认两位小数

    其他字段: 参见 el-input 组件字段

  具体实现请移步 <el-link
      type="primary"
      :underline="false"
      href="https://tsz.now.sh/2020/05/10/based-on-element-ui-encapsulation-number-input/"
      target="_blank"
      >基于 ElementUI 封装的 NumberInput | Henry</el-link
    >

  <el-link
    type="primary"
    :underline="false"
    href="https://github.com/HenryTSZ/vue-element-extend/blob/master/src/plugins/NumberInput.vue"
    target="_blank"
    >源码</el-link>       <el-link
    type="primary"
    :underline="false"
    href="https://github.com/HenryTSZ/vue-element-extend/blob/master/src/components/element-ui/NumberInputDemo.vue"
    target="_blank"
  >Demo 示例</el-link>

    </code></pre>

    <base-form :model="form" :form-items="items" label-width="auto"> </base-form>
  </div>
</template>

<script>
import BaseForm from 'plugins/BaseForm'
export default {
  name: 'NumberInputDemo',
  components: { BaseForm },
  props: {},
  data() {
    return {
      form: {
        'integer-plus': 'jj',
        'integer-minus': '',
        'integer-all': '',
        'decimal-plus': '',
        'decimal-minus': '',
        'decimal-all': ''
      },
      items: [
        {
          label: '正整数',
          prop: 'integer-plus',
          type: 'integer',
          component: 'number-input'
        },
        {
          label: '负整数',
          prop: 'integer-minus',
          type: 'integer',
          signed: 'minus',
          component: 'number-input'
        },
        {
          label: '整数',
          prop: 'integer-all',
          type: 'integer',
          signed: 'all',
          component: 'number-input'
        },
        {
          label: '正整数或正小数',
          prop: 'decimal-plus',
          type: 'decimal',
          component: 'number-input'
        },
        {
          label: '负整数或负小数',
          prop: 'decimal-minus',
          type: 'decimal',
          signed: 'minus',
          component: 'number-input'
        },
        {
          label: '整数或小数',
          prop: 'decimal-all',
          type: 'decimal',
          signed: 'all',
          component: 'number-input'
        }
      ]
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

<style lang="less">
.number-input-demo {
}
</style>

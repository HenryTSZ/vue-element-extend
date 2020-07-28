<!--
 * @Author: HenryTSZ
 * @Date: 2020-05-10 10:06:07
 * @Description:
 * @LastEditors: HenryTSZ
 * @LastEditTime: 2020-07-28 10:58:54
 -->
<template>
  <div class="reg-input-demo">
    <pre><code>
  基于 el-input 封装的只能输入 reg 验证通过的组件

  Attributes:

    v-model / value: value 值

    reg: 正则表达式. 默认 /./

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
    href="https://github.com/HenryTSZ/vue-element-extend/blob/master/src/plugins/RegInput.vue"
    target="_blank"
    >源码</el-link>       <el-link
    type="primary"
    :underline="false"
    href="https://github.com/HenryTSZ/vue-element-extend/blob/master/src/components/element-ui/RegInputDemo.vue"
    target="_blank"
  >Demo 示例</el-link>

    </code></pre>

    <base-form :model="form" :form-items="items" label-width="auto"> </base-form>
  </div>
</template>

<script>
import BaseForm from 'plugins/BaseForm'
export default {
  name: 'RegInputDemo',
  components: { BaseForm },
  props: {},
  data() {
    return {
      form: {
        chinese: '',
        number: '',
        email: '',
        phone: '',
        idCard: ''
      },
      items: [
        {
          label: '中文',
          prop: 'chinese',
          type: 'text',
          reg: /^[\u4E00-\u9FA5]*$/,
          component: 'reg-input'
        },
        {
          label: '数字',
          prop: 'number',
          type: 'text',
          reg: /^-?(\d*|\d+(\.\d*)?)$/,
          component: 'reg-input'
        },
        {
          label: 'Email',
          prop: 'email',
          type: 'text',
          reg: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
          component: 'reg-input'
        },
        {
          label: '手机号',
          prop: 'phone',
          type: 'text',
          reg: /^1([3456789]\d{0,9})?$/,
          len: 11,
          component: 'reg-input'
        },
        {
          label: '身份证号',
          prop: 'idCard',
          type: 'text',
          reg: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
          component: 'reg-input'
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
.reg-input-demo {
}
</style>

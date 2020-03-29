<template>
  <div class="bases-form">
    <pre><code>
  简化 el-form 重复代码, 最少仅需要一行代码即可

  支持 单行文本, 文本域, 整数, 小数, 选择器; 并且支持这些组件的 Attributes 和 Slots

  Attributes:

    支持 el-form 全部 Attributes

    form-items: Array

      字段说明:

      label: el-form label

      prop: el-form prop

      type: 取值范围: ['text', 'textarea', 'integer', 'decimal', 'select']

      select: type 为 select 必填, 选择器数据

      focus: 聚焦

      其他字段: 参见 el-input 和 el-select

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
    <base-form :model="model" :ref="ref" :form-items="formItems" label-width="auto">
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </base-form>
  </div>
</template>

<script>
export default {
  name: 'BasesForm',
  components: { BaseForm: resolve => require(['plugins/BaseForm'], resolve) },
  data() {
    return {
      model: {
        text: '',
        textarea: '',
        integer: '',
        decimal: '',
        select: ''
      },
      ref: 'form',
      formItems: [
        { label: '单行文本', prop: 'text', type: 'text', component: 'el-input', focus: true },
        {
          label: '前置',
          prop: 'prepend',
          type: 'text',
          component: 'el-input',
          slot: { prepend: 'http://' }
        },
        {
          label: '后置',
          prop: 'append',
          type: 'text',
          component: 'el-input',
          slot: { append: '.com' }
        },
        { label: '文本域', prop: 'textarea', type: 'textarea', component: 'el-input' },
        { label: '整数', prop: 'integer', type: 'integer', component: 'number-input' },
        { label: '小数', prop: 'decimal', type: 'decimal', component: 'number-input' },
        {
          label: '选择器',
          prop: 'select',
          type: 'select',
          component: 'el-select',
          select: [
            { label: '选项一', value: 'select1' },
            { label: '选项二', value: 'select2' },
            { label: '选项三', value: 'select3' },
            { label: '选项四', value: 'select4' }
          ]
        }
      ]
    }
  },
  methods: {
    submitForm() {
      this.$refs[this.ref].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm() {
      this.$refs[this.ref].resetFields()
    }
  }
}
</script>

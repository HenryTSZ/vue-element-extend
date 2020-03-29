<template>
  <el-input v-model="model" v-bind="$attrs" @input="_input" v-on="listeners">
    <slot v-for="(value, key) in $slots" :name="key" :slot="key"></slot>
  </el-input>
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'NumberInput',
  props: {
    value: [Number, String],
    type: {
      // integer 整数, decimal 小数
      type: String,
      default: 'decimal'
    },
    places: {
      //保留小数位数
      type: [Number, String],
      default: 2 //默认两位小数
    },
    Event: {
      type: String,
      default: 'input'
    }
  },
  data() {
    return {
      model: this.value
    }
  },
  watch: {
    value() {
      this.model = this.value
    }
  },
  methods: {
    _input(val) {
      const numReg = /^[0-9]$/
      let v
      if (this.type === 'integer') {
        // 验证 整数
        v = val.replace(/./g, function(e) {
          if (numReg.test(parseInt(e))) {
            return e
          } else {
            return ''
          }
        })
        this.$nextTick(() => {
          this.model = v
          this.$emit('input', v)
        })
        return
      }
      if (this.type === 'decimal') {
        // 验证 只留小数点和数字
        v = val.replace(/./g, function(e) {
          if (e === '.' || numReg.test(parseInt(e))) {
            return e
          } else {
            return ''
          }
        })
      }
      //小数位数
      if (v.indexOf('.') > -1) {
        let l, r
        // 阻止输入两个小数点
        if (v.split('.').length > 2) {
          v = v.slice(0, v.length - 1)
        }
        // 截取小数点
        l = v.split('.')[0]
        r = v.split('.')[1] || ''
        if (r.length > +this.places) {
          r = r.slice(0, +this.places)
        }
        v = l + '.' + r
      }
      this.$nextTick(() => {
        this.model = v
        this.$emit('input', v)
      })
    }
  },
  computed: {
    listeners() {
      return Object.assign({}, this.$listeners, { [this.Event]: this._input })
    }
  }
}
</script>

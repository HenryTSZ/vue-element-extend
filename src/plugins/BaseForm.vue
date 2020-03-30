<template>
  <el-form v-bind="$attrs" :model="model" ref="elForm" class="base-form">
    <slot name="prev"></slot>
    <el-form-item
      v-for="item in formItems"
      :key="item.prop"
      v-bind="item"
      :rules="[
        {
          required: !item.noRequired,
          message: item.ruleMessage || `${handlePlaceholder(item.type)}${item.label}`,
          trigger: item.type === 'select' ? 'change' : 'blur'
        }
      ]"
    >
      <editable-elements :model="model" :item="item"></editable-elements>
    </el-form-item>
    <slot></slot>
  </el-form>
</template>

<script>
import { handlePlaceholder } from 'utils'

export default {
  name: 'BaseForm',
  components: { EditableElements: resolve => require(['plugins/EditableElements'], resolve) },
  props: {
    model: {
      type: Object,
      default() {
        return {}
      }
    },
    formItems: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    handlePlaceholder
  },
  mounted() {
    for (let key in this.$refs.elForm) {
      if (!(key in this) && typeof this.$refs.elForm[key] === 'function') {
        this[key] = this.$refs.elForm[key].bind(this.$refs.elForm)
      }
    }
  }
}
</script>

<style lang="less"></style>

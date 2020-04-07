<template>
  <el-table ref="elTable" class="base-table" v-bind="$attrs" v-on="$listeners">
    <slot name="prev"></slot>
    <template v-for="(column, index) in columns">
      <el-table-column v-if="column.editable" :key="column.prop" v-bind="column">
        <editable-elements
          slot-scope="{ row, $index }"
          :model="row"
          :item="{ ...column, focus: index === focusCol && $index === focusRow }"
          @change="change(row, $event, column)"
        ></editable-elements>
      </el-table-column>
      <el-table-column v-else :key="column.prop" v-bind="column"> </el-table-column>
    </template>
    <slot></slot>
  </el-table>
</template>

<script>
export default {
  name: 'BaseTable',
  components: {
    EditableElements: resolve => require(['plugins/EditableElements'], resolve)
  },
  props: {
    columns: {
      type: Array,
      default() {
        return []
      }
    },
    focusRow: {
      type: Number,
      default: 0
    },
    focusCol: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {}
  },
  methods: {
    change(row, e, column) {
      this.$emit('row-change', row, e, column.prop)
    }
  },
  mounted() {
    for (let key in this.$refs.elTable) {
      if (!(key in this) && typeof this.$refs.elTable[key] === 'function') {
        this[key] = this.$refs.elTable[key].bind(this.$refs.elTable)
      }
    }
  }
}
</script>

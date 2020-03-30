<template>
  <el-table ref="elTable" class="base-table" v-bind="$attrs" v-on="$listeners">
    <slot name="prev"></slot>
    <template v-for="(column, index) in columns">
      <el-table-column
        v-if="column.editable"
        :key="column.prop"
        :align="column.align || 'center'"
        :header-align="column.headerAlign || 'center'"
        v-bind="column"
      >
        <template slot-scope="{ row, $index }">
          <editable-elements
            :model="row"
            :item="{ ...column, focus: index === focusCol && $index === focusRow }"
          ></editable-elements>
        </template>
      </el-table-column>
      <el-table-column
        v-else
        :key="column.prop"
        :align="column.align || 'center'"
        :header-align="column.headerAlign || 'center'"
        v-bind="column"
      >
      </el-table-column>
    </template>
    <slot></slot>
  </el-table>
</template>

<script>
import { handlePlaceholder } from 'utils'

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
    handlePlaceholder,
    change(row, e) {
      this.$emit('change', row, e)
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

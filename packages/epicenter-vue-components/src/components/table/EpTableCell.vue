<!-- eslint-disable vue/no-v-html -->
<template>
  <span
    :class="column.class"
    v-html="formattedCell(row, column)"
  />
</template>

<script setup>
  import DOMPurify from 'dompurify'

  defineOptions({
    name: 'EpTableCell'
  })

  const props = defineProps({
    row: {
      type: Object,
      required: true
    },
    column: {
      type: Object,
      required: true
    },
    styles: {
      type: Array,
      default: () => []
    }
  })

  const formattedCell = (row, column) => {
    const value = row[column.key].value || row[column.key]
    const formatter = column.formatter
    return formatter ? DOMPurify.sanitize(formatter(value, row)) : value
  }
</script>
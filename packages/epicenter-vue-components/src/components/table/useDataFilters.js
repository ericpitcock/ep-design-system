import { ref, computed } from 'vue'
import { faker } from '@faker-js/faker'

export default function useDataFilters(columns, data) {
  const filters = ref({})

  const generateFilters = (columnsToFilter, disabledFilters, customSortOrder = {}) => {
    const uniqueValues = {}

    // Extract unique values for specified columns
    columns.value.forEach(column => {
      if (columnsToFilter.includes(column.key)) {
        uniqueValues[column.key] = Array.from(
          new Set(data.value.map(user => getColumnValue(user, column.key))))
      }
    })

    // Sort unique values based on custom sort order if provided
    for (const key in uniqueValues) {
      if (customSortOrder[key]) {
        uniqueValues[key].sort((a, b) => {
          const indexA = customSortOrder[key].indexOf(a)
          const indexB = customSortOrder[key].indexOf(b)
          return indexA - indexB
        })
      } else {
        uniqueValues[key].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
      }
    }

    const generatedFilters = {}

    // Generate filter objects based on unique values
    for (const key in uniqueValues) {
      generatedFilters[key] = uniqueValues[key].map(value => ({
        id: faker.string.uuid(),
        name: key,
        value: value,
        checked: disabledFilters.includes(value) ? false : true,
        label: value,
        disabled: false
      }))
    }

    filters.value = generatedFilters
  }

  const getColumnValue = (user, key) => {
    const column = columns.value.find(column => column.key === key)
    if (column.cellType === 'component') {
      return user[key].value
    } else {
      return user[key]
    }
  }

  const filteredData = computed(() => {
    let filtered = data.value

    // Apply filters
    for (const key in filters.value) {
      filtered = filtered.filter(user => {
        const value = getColumnValue(user, key)
        const checked = filters.value[key].find(filter => filter.value === value).checked
        return checked
      })
    }

    return filtered
  })

  return {
    filters,
    generateFilters,
    filteredData
  }
}

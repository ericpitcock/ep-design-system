import { computed, ref } from 'vue'

export default function usePagination(data) {
  const currentPage = ref(1)
  const pageSize = ref(10)

  const totalPages = computed(() => {
    return Math.ceil(data.value.length / pageSize.value)
  })

  const paginatedData = computed(() => {
    if (currentPage.value > totalPages.value) {
      currentPage.value = totalPages.value
    } else if (currentPage.value < 1) {
      currentPage.value = 1
    }

    const startIndex = (currentPage.value - 1) * pageSize.value
    return data.value.slice(startIndex, startIndex + pageSize.value)
  })

  const onPageChange = (page) => {
    console.log('onPageChange:', page)
    currentPage.value = page
  }

  console.log(pageSize.value, currentPage.value, totalPages.value)

  return { paginatedData, currentPage, totalPages, onPageChange }
}

import EpCheckbox from '@/components/checkbox/EpCheckbox.vue'
import EpEmptyState from '@/components/empty-state/EpEmptyState.vue'
import EpFlex from '@/components/flexbox/EpFlex.vue'
import EpInput from '@/components/input/EpInput.vue'
import EpTable from '@/components/table/EpTable.vue'
import EpTableSearchInput from '@/components/table/EpTableSearchInput.vue'
import EpTablePagination from '@/components/table/EpTablePagination.vue'
import EpTableSortableHeader from '@/components/table/EpTableSortableHeader.vue'
import useExclude from '@/components/table/useExclude.js'
import useColumnFilters from '@/components/table/useColumnFilters.js'
import useDataFilters from '@/components/table/useDataFilters.js'
import useSorting from '@/components/table/useSorting.js'
import usePagination from '@/components/table/usePagination.js'
import useSearch from '@/components/table/useSearch.js'
import { paddedSurfaceOverflow } from '../../helpers/decorators.js'
import { columns, fakeArray } from '../../data/tableData'
import { computed, ref, onMounted } from 'vue'

export default {
  title: 'Components/Table',
  component: EpTable,
  decorators: [paddedSurfaceOverflow],
  argTypes: {
    columns: {
      table: { disable: true }
    },
    data: {
      table: { disable: true }
    },
    exclude: {
      table: { disable: true }
    },
    compact: {
      name: 'Compact',
      control: {
        type: 'boolean'
      }
    },
    bordered: {
      name: 'Bordered',
      control: {
        type: 'boolean'
      },
    },
    selectable: {
      name: 'Selectable',
      control: {
        type: 'boolean'
      },
    },
    striped: {
      name: 'Striped',
      control: {
        type: 'boolean'
      },
    },
    width: {
      name: 'Width',
      control: {
        type: 'text'
      }
    },
    stickyHeader: {
      name: 'Sticky Header',
      control: {
        type: 'boolean'
      }
    },
    calculateHeight: {
      name: 'Calculate Height',
      control: {
        type: 'boolean'
      }
    },
    calculateHeightOffset: {
      name: 'Calculate Height Offset',
      control: {
        type: 'number'
      }
    },
    styles: {
      table: { disable: true }
    }
  }
}

export const Table = (args) => ({
  components: {
    EpCheckbox,
    EpEmptyState,
    EpFlex,
    EpInput,
    EpTable,
    EpTableSearchInput,
    EpTablePagination,
    EpTableSortableHeader
  },
  setup() {
    const tableData = ref(fakeArray(100))
    const columnsRef = ref(columns)

    // use exclude
    const {
      includedColumns,
      includedData
    } = useExclude(columnsRef, tableData, args.exclude)

    // use sorting
    const {
      sortedData,
      sortBy,
      sortColumn,
      sortOrder
    } = useSorting(includedData, 'start_date', 'desc')

    onMounted(() => {
      const columnsToFilter = ['status', 'type']
      const disabledFilters = []

      generateFilters(columnsToFilter, disabledFilters)
    })

    const { filters, generateFilters, filteredData } = useDataFilters(includedColumns, sortedData)

    // use column filters
    const {
      columnFilters,
      visibleColumns,
      visibleData,
      handleFilter
    } = useColumnFilters(includedColumns, [], filteredData)

    // use search
    const {
      searchedData,
      searchText,
      updateSearchText
    } = useSearch(visibleData)

    // use pagination
    const {
      paginatedData,
      currentPage,
      totalPages,
      onPageChange
    } = usePagination(searchedData, 1, 30)

    const styles = computed(() => {
      return {
        '--ep-table-width': args.width
      }
    })

    const onRowClick = (row) => {
      console.log('Row clicked:', row)
    }

    return {
      args,
      // columns,
      includedColumns,
      // sorting
      sortBy,
      sortColumn,
      sortOrder,
      // pagination
      currentPage,
      totalPages,
      onPageChange,
      paginatedData,
      // search
      searchText,
      updateSearchText,
      styles,
      onRowClick,
      visibleColumns,
      columnFilters,
      handleFilter,
      filters
    }
  },
  template: `
  <ep-flex flex-props=",,row,,,,,3rem,">
    <div class="sidebar" style="flex: 0 0 140px">
      <ep-flex flex-props=",,column,,,,,1rem,">
        <ep-checkbox
          v-for="filter in columnFilters"
          :key="filter.id"
          v-bind="filter"
          v-model="filter.checked"
          @update:modelValue="handleFilter($event, filter.id)"
        />
        <template
          v-for="(filterSet, category) in filters"
          :key="category"
        >
          <h3 class="text-style--section">
            {{ category.replace(/_/g, ' ') }}
          </h3>
          <ep-checkbox
            v-for="checkbox in filterSet"
            :key="checkbox.label"
            v-bind="checkbox"
            v-model="checkbox.checked"
          />
        </template>
      </ep-flex>
    </div>
    <div class="content" style="flex: 1; overflow: auto;">
      <ep-input
        size="large"
        placeholder="Search"
        clearable
        v-model="searchText"
        @clear="updateSearchText('')"
        @update:modelValue="updateSearchText"
      />
      <ep-empty-state v-if="!paginatedData.length">
        No data found
      </ep-empty-state>
      <ep-table
        v-else
        :columns="visibleColumns"
        :data="paginatedData"
        :style="styles"
        v-bind="args"
        @row-click="onRowClick"
      >
        <template #header="{ column }">
          <ep-table-sortable-header
            :column="column"
            :sort-column="sortColumn"
            :sort-order="sortOrder"
            @sort="sortBy"
          />
        </template>
      </ep-table>
      <ep-table-pagination
        :current-page="currentPage"
        :total-pages="totalPages"
        @page-change="onPageChange"
      />
    </div>
  </ep-flex>
  `
})

Table.args = {
  exclude: ['id'],
  compact: false,
  bordered: true,
  selectable: false,
  striped: true,
  width: '100%',
  stickyHeader: true,
  calculateHeight: true,
  calculateHeightOffset: 81
}
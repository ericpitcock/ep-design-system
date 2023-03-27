import { centered } from '../../helpers/decorators'
import EpDropdown from '@/components/dropdown/EpDropdown'

const buttonDefaults = {
  kind: 'secondary',
  size: 'default',
  title: 'Components/Default Dropdown',
  label: 'Export',
  iconRight: { name: 'chevron-down' },
  iconLeft: { name: 'export' }
}
const containerProps = {
  backgroundColor: 'var(--background-4)',
  containerPadding: '1rem 0',
  borderRadius: 'var(--border-radius)',
  borderColor: 'var(--border-color--lighter)'
}
const fakeDropdownItems = [
  {
    label: 'PDF',
    iconLeft: { name: 'file' }
  },
  {
    label: 'JPG',
    iconLeft: { name: 'file' }
  },
  {
    divider: true
  },
  {
    label: 'CSV',
    iconLeft: { name: 'file' }
  },
  {
    label: 'JSON',
    iconLeft: { name: 'file' }
  }
]

export default {
  title: 'Components/Dropdown',
  component: EpDropdown,
  decorators: [centered],
  argTypes: {
    alignRight: {
      name: 'Align Right',
      control: {
        type: 'boolean'
      }
    },
    button: {
      name: 'Button Props',
      control: {
        type: 'object'
      }
    },
    containerProps: {
      name: 'Container Props',
      control: {
        type: 'object'
      }
    },
    menuItems: {
      name: 'Menu Items',
      control: {
        type: 'array'
      }
    },
    showOnHover: {
      name: 'Show On Hover',
      control: {
        type: 'boolean'
      }
    },
  }
}

export const Dropdown = args => ({
  components: {
    EpDropdown
  },
  setup() {
    return { args }
  },
  template: '<ep-dropdown v-bind="args" />'
})

Dropdown.args = {
  button: buttonDefaults,
  containerProps,
  menuItems: fakeDropdownItems,
  showOnHover: true
}

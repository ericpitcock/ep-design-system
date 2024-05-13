import { centeredBg } from '../../helpers/decorators.js'
import { iconOptions, iconMapping } from '../../helpers/iconHelper.js'
import EpSplitButton from '@/components/split-button/EpSplitButton.vue'
import { computed } from 'vue'

export default {
  title: 'Components/Button/Split Button',
  component: EpSplitButton,
  decorators: [centeredBg],
  argTypes: {
    disabled: {
      name: 'Disabled',
      control: {
        type: 'boolean'
      },
    },
    buttonProps: {
      name: 'Button Props',
      control: {
        type: 'object'
      },
      table: { category: 'Config' }
    },
    dropdownProps: {
      name: 'Dropdown Props',
      control: {
        type: 'object'
      },
      table: { category: 'Config' }
    },
    'buttonProps.label': {
      name: 'Label',
      control: {
        type: 'text'
      }
    },
    'buttonProps.size': {
      name: 'Size',
      options: ['small', 'default', 'large', 'xlarge'],
      control: {
        type: 'radio',
        labels: {
          small: 'Small',
          default: 'Default',
          large: 'Large',
          xlarge: 'X-Large'
        }
      }
    },
    'buttonProps.iconLeft': {
      name: 'Button Icon (Left)',
      options: iconOptions,
      mapping: iconMapping,
      control: {
        type: 'select'
      }
    },
    'buttonProps.iconRight': {
      name: 'Button Icon (Right)',
      options: iconOptions,
      mapping: iconMapping,
      control: {
        type: 'select'
      }
    },
    'dropdownProps.buttonProps.iconRight': {
      name: 'Dropdown Icon',
      options: iconOptions,
      mapping: iconMapping,
      control: {
        type: 'select'
      }
    },
  }
}

export const SplitButton = args => ({
  components: { EpSplitButton },
  setup() {
    const buttonProps = computed(() => {
      return {
        variant: args['buttonProps.variant'],
        size: args['buttonProps.size'],
        label: args['buttonProps.label'],
        iconLeft: args['buttonProps.iconLeft'],
        iconRight: args['buttonProps.iconRight'],
      }
    })

    const dropdownProps = computed(() => {
      return {
        buttonProps: {
          variant: args['buttonProps.variant'],
          size: args['buttonProps.size'],
          label: '',
          iconRight: args['dropdownProps.buttonProps.iconRight'],
        },
        containerProps: {
          backgroundColor: 'var(--interface-overlay)',
          // containerPadding: '1rem 0',
          borderRadius: 'var(--border-radius)',
          borderColor: 'var(--border-color--lighter)',
        },
        menuItems: [
          { label: 'Download v1.1' },
          { label: 'Download v1.0.1' },
          { label: 'Download v1.0' },
          { label: 'Download v0.9' }
        ]
      }
    })

    return { args, buttonProps, dropdownProps }
  },
  template: `
    <ep-split-button
      :buttonProps="buttonProps"
      :dropdownProps="dropdownProps"
      v-bind="args"
    />
  `
})

SplitButton.args = {
  disabled: false,
  'buttonProps.label': 'Download Latest (v1.2)',
  'buttonProps.size': 'large',
  'dropdownProps.buttonProps.iconRight': 'chevron-down',
}
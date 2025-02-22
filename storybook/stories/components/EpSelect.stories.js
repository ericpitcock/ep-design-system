import EpSelect from '@/components/select/EpSelect.vue'

import { centeredSurface } from '../../helpers/decorators.js'
import { iconMapping,iconOptions } from '../../helpers/iconHelper.js'

export default {
  title: 'Components/Select',
  component: EpSelect,
  decorators: [centeredSurface],
  argTypes: {
    width: {
      name: 'Width',
      control: {
        type: 'text'
      }
    },
    size: {
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
    iconLeft: {
      name: 'Icon',
      options: iconOptions,
      mapping: iconMapping,
      control: {
        type: 'select'
      }
    },
    selectId: {
      table: { disable: true }
    },
    options: {
      table: { disable: true }
    },
    modelValue: { table: { disable: true } },
    placeholder: {
      name: 'Placeholder',
      control: {
        type: 'text'
      }
    },
    disabled: {
      name: 'Disabled',
      control: {
        type: 'boolean'
      }
    },
    autofocus: {
      name: 'Autofocus',
      control: {
        type: 'boolean'
      }
    },
    borderWidth: {
      name: 'Border Width',
      control: {
        type: 'text'
      }
    },
    borderStyle: {
      name: 'Border Style',
      control: {
        type: 'text'
      }
    },
    borderColor: {
      name: 'Border Color',
      control: {
        type: 'text'
      }
    },
    borderRadius: {
      name: 'Border Radius',
      control: {
        type: 'text'
      }
    },
    backgroundColor: {
      name: 'Background Color',
      control: {
        type: 'text'
      }
    },
    readonly: { table: { disable: true } },
    required: { table: { disable: true } },
  }
}

export const Select = args => ({
  components: { EpSelect },
  setup() {
    return { args }
  },
  template: '<ep-select v-bind="args" />'
})

Select.args = {
  selectId: 'select',
  iconLeft: 'f-coffee',
  width: '400px',
  size: 'xlarge',
  placeholder: 'Select your coffee type…',
  disabled: false,
  autofocus: false,
  options: [
    {
      label: 'Drip Coffee',
      value: 'drip'
    },
    {
      label: 'Espresso',
      value: 'espresso'
    },
    {
      label: 'Cold Brew',
      value: 'cold-brew'
    },
    {
      label: 'French Press',
      value: 'french-press'
    },
    {
      label: 'Pour Over',
      value: 'pour-over'
    },
    {
      label: 'Chemex',
      value: 'chemex'
    },
    {
      label: 'Aeropress',
      value: 'aeropress'
    }
  ],
  borderWidth: '0.1rem',
  borderStyle: 'solid',
  borderColor: 'var(--border-color)',
  borderRadius: 'var(--border-radius)',
  backgroundColor: 'var(--interface-foreground)'
}
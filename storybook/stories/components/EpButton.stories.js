import vueRouter from 'storybook-vue3-router'
import { centered } from '../../helpers/decorators'
import { colorNames, colorValues } from '../../helpers/colorHelper'
import { iconNames, iconNamesMapping } from '@/components/icon/load-icons'
import EpButton from '@/components/button/EpButton'

export default {
  title: 'Components/Button',
  component: EpButton,
  decorators: [centered],
  argTypes: {
    disabled: {
      name: 'Disabled',
      control: {
        type: 'boolean'
      }
    },
    outlined: {
      name: 'Outlined',
      control: {
        type: 'boolean'
      }
    },
    variant: {
      name: 'Variant',
      options: [
        'primary',
        'secondary',
        'ghost',
        'danger',
        'warning',
        'success'
      ],
      control: {
        type: 'radio',
        labels: {
          primary: 'Primary',
          secondary: 'Secondary',
          ghost: 'Ghost',
          danger: 'Danger',
          warning: 'Warning',
          success: 'Success'
        }
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
    title: {
      name: 'Title(Tooltip)',
      control: {
        type: 'text'
      }
    },
    to: {
      table: { disable: true }
    },
    href: {
      table: { disable: true }
    },
    isActiveMenuItem: {
      table: { disable: true }
    },
    type: {
      table: { disable: true }
    },
    command: {
      table: { disable: true }
    },
    label: {
      name: 'Label',
      control: {
        type: 'text'
      }
    },
    iconLeft: {
      name: 'Icon Left',
      options: iconNames,
      mapping: iconNamesMapping,
      control: {
        type: 'select'
      },
      table: {
        category: 'Icons'
      }
    },
    iconRight: {
      name: 'Icon Right',
      options: iconNames,
      mapping: iconNamesMapping,
      control: {
        type: 'select'
      },
      table: {
        category: 'Icons'
      }
    },
    backgroundColor: {
      name: 'Background Color',
      options: colorNames,
      mapping: colorValues,
      control: {
        type: 'select',
      },
      table: {
        category: 'Overrides'
      }
    },
    borderColor: {
      name: 'Border Color',
      options: colorNames,
      mapping: colorValues,
      control: {
        type: 'select',
      },
      table: {
        category: 'Overrides'
      }
    },
    textColor: {
      name: 'Text Color',
      options: ['None', 'var(--text-color)', 'var(--text-color--inverse)'],
      mapping: {
        'None': '',
        'var(--text-color)': 'var(--text-color)',
        'var(--text-color--inverse)': 'var(--text-color--inverse)'
      },
      control: {
        type: 'select',
      },
      table: {
        category: 'Overrides'
      }
    },
  }
}

export const Button = args => ({
  components: { EpButton },
  setup() {
    return { args }
  },
  template: '<ep-button v-bind="args" />'
})

Button.args = {
  disabled: false,
  label: 'Download the Internet',
  variant: 'primary',
  outlined: false,
  size: 'large',
  title: 'This is the tooltip',
  to: '',
  href: '',
  iconLeft: 'none',
  iconRight: 'none',
  backgroundColor: 'None',
  borderColor: 'None',
  textColor: 'None',
}

Button.decorators = [
  vueRouter()
]
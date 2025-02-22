import { computed } from 'vue'

import EpBadge from '@/components/badge/EpBadge.vue'

import { centeredSurface } from '../../helpers/decorators.js'

export default {
  title: 'Components/Badge',
  component: EpBadge,
  decorators: [centeredSurface],
  argTypes: {
    label: {
      name: 'Label',
      control: {
        type: 'text',
      }
    },
    classes: {
      name: 'Style',
      options: [
        'Primary',
        'Success',
        'Warning',
        'Danger',
        'Custom',
      ],
      mapping: {
        None: null,
        Primary: { 'badge-variant-primary': true },
        Success: { 'badge-variant-success': true },
        Warning: { 'badge-variant-warning': true },
        Danger: { 'badge-variant-danger': true }
      },
      control: {
        type: 'radio',
      },
      table: {
        category: 'Styles'
      }
    },
    backgroundColor: {
      if: { arg: 'classes', eq: 'Custom' },
      name: '--ep-badge-bg-color',
      control: {
        type: 'color'
      },
      table: {
        category: 'Styles'
      },
    },
    borderColor: {
      if: { arg: 'classes', eq: 'Custom' },
      name: '--ep-badge-border-color',
      control: {
        type: 'color'
      },
      table: {
        category: 'Styles'
      },
    },
    textColor: {
      if: { arg: 'classes', eq: 'Custom' },
      name: '--ep-badge-text-color',
      control: {
        type: 'color'
      },
      table: {
        category: 'Styles'
      },
    },
    styles: {
      table: { disable: true }
    },
  }
}

export const Badge = args => ({
  components: {
    EpBadge
  },
  setup() {
    const styles = computed(() => ({
      '--ep-badge-bg-color': args.backgroundColor,
      '--ep-badge-border-color': args.borderColor,
      '--ep-badge-text-color': args.textColor,
    }))

    return { args, styles }
  },
  template: `
    <ep-badge
      v-bind="args"
      :class="args.classes"
      :style="styles"
    />
  `
})

Badge.args = {
  label: 'Subscribed',
  classes: 'Primary',
}

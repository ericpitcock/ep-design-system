import { padded } from '../../../helpers/decorators.js'
import EpColor from './EpColor.vue'
import { useStorybookStore } from '../../../store'
import { computed } from 'vue'

export default {
  title: 'Style/Color',
  component: EpColor,
  decorators: [padded],
  argTypes: {},
  parameters: {
    controls: { hideNoControlsWarning: true }
  }
}

export const Color = (args) => ({
  components: { EpColor },
  setup() {

    const store = useStorybookStore()
    const currentTheme = computed(() => store.theme)

    return { args, currentTheme }
  },
  template: '<ep-color :theme="currentTheme" />'
})

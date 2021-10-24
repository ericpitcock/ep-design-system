// vuex
import Vue from 'vue'
import Vuex from 'vuex'
import store from '../src/store'

Vue.use(Vuex)
Vue.prototype.$store = store

// global styles
import '!style-loader!css-loader!sass-loader!../src/assets/scss/global.scss'

export const parameters = {
  layout: 'fullscreen'
}

// global decorators
export const decorators = [(story) => ({
  components: { story },
  template: '<div style="height: 100vh;"><story /></div>'
})]
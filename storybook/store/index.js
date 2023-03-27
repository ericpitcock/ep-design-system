import { createStore } from 'vuex'
import faker from 'faker'

export default createStore({
  state: {
    notifications: [
      {
        id: faker.datatype.uuid(),
        active: false,
        message: 'Welcome to Acme Asset Explorer! You just unlocked new levels of visibility into your assets and vulnerabilities.',
        alertStyle: 'info',
        timestamp: faker.date.past(2).toISOString()
      },
      {
        id: faker.datatype.uuid(),
        active: false,
        message: 'App version 1.0.3 is now available',
        alertStyle: 'info',
        timestamp: faker.date.past(1).toISOString()
      },
      {
        id: faker.datatype.uuid(),
        active: false,
        message: 'Your support request was sent successfully',
        alertStyle: 'success',
        timestamp: faker.date.recent(25).toISOString()
      },
      {
        id: faker.datatype.uuid(),
        active: false,
        message: 'You’re running low on endpoint licenses',
        alertStyle: 'warning',
        timestamp: faker.date.recent(15).toISOString()
      },
      {
        id: faker.datatype.uuid(),
        active: false,
        message: 'Your organization has 34 assets with new critical vulnerabilities',
        alertStyle: 'error',
        timestamp: faker.date.recent(5).toISOString()
      }
    ],
    notificationCenterOpen: false,
    // sidebar: false,
    theme: 'dark'
  },
  getters: {
    getActiveNotifications: state => {
      return state.notifications.filter(n => n.active)
    },
    getInactiveNotifications: state => {
      return state.notifications.filter(n => !n.active)
    },
    hasActiveNotifications: state => {
      return state.notifications.some(n => n.active)
    }
  },
  mutations: {
    setTheme: (state, data) => {
      state.theme = data
    },
    addNotification: (state, newNotification) => {
      console.log('addNotification mutation', newNotification)
      state.notifications.push(newNotification)
    },
    clearNotifications: state => {
      state.notifications = []
    },
    removeNotification: (state, notification) => {
      console.log('removing notification', notification)
      state.notifications = state.notifications.filter(
        n => n.id !== notification.id
      )
    },
    toggleNotificationCenter: state => {
      state.notificationCenterOpen = !state.notificationCenterOpen
    }
  },
  actions: {
    addNotification: ({ state, commit }, notification) => {
      // build new notification object
      const newNotification = {
        ...notification, // using spread syntax breaks the object reference, recevies message and alertStyle (success, info, warning, error)
        active: true, // add active property
        id: faker.datatype.uuid(), // adds unique ID each time
        timestamp: new Date().toISOString()
      }

      // add the notification object to the array
      commit('addNotification', newNotification)

      // if it hasn't been dismissed, move it to the notifications center (active: false) after 5 seconds
      setTimeout(() => {
        // if newNotification is not in the array, return
        if (!state.notifications.includes(newNotification)) return

        // find newNotification in the array
        const index = state.notifications.findIndex(
          n => n.id === newNotification.id
        )
        // active to false
        state.notifications[index].active = false
      }, 5000)
    },
    clearNotifications: ({ state, commit }) => {
      commit('clearNotifications')      
    },
    toggleNotificationCenter({ state, commit }) {
      commit('toggleNotificationCenter')
    },
    removeNotification({ state, commit }, notification) {
      commit('removeNotification', notification)
    },
    toggleTheme({ state, commit }) {
      let newTheme = state.theme == 'dark' ? 'light' : 'dark'
      document.documentElement.setAttribute('data-color-theme', newTheme)
      commit('setTheme', newTheme)
    }
  }
})
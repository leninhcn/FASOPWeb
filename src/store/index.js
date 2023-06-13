import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import VueCookies from 'vue-cookies'

const store = createStore({
  state,
  mutations,
  actions,
  getters,
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => VueCookies.get(key),
        setItem: (key, value) => VueCookies.set(key, value, { expires: 1, secure: true }),
        removeItem: key => VueCookies.remove(key)
      }
    })
  ],
})

export default store
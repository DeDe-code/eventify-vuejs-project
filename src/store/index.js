// store user after signup and log in

import { reactive } from 'vue'

const state = reactive({ user: null })
const methods = {
  setUser(payload) {
    state.user = payload ? payload.user : null
    console.log(state.user)
  }
}

export default {
  state,
  methods
}

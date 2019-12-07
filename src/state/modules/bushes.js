import bushesApi from '../../api/bushes'

export const state = {
  init: false,
  bushes: getSavedState('bushes') || [],
}

export const mutations = {
  SET_BUSHES(state, bushes) {
    state.bushes = bushes
    saveState('bushes', bushes)
  },
}

export const getters = {
  bushes({ bushes }) {
    return bushes
  },
}

export const actions = {
  async get({ commit }) {
    const bushes = await bushesApi.get()
    commit('SET_BUSHES', bushes)
    return bushes
  },
}
// ===
// Private helpers
// ===
function getSavedState(key) {
  return JSON.parse(window.localStorage.getItem(key))
}

function saveState(key, state) {
  window.localStorage.setItem(key, JSON.stringify(state))
}

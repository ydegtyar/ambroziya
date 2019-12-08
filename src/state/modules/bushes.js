import bushesApi from '../../api/bushes'
import Bush from '@src/entities/bush'

export const state = {
  bushes: getSavedState('bushes') || [],
  current: null,
}

export const mutations = {
  SET_BUSHES(state, bushes) {
    state.bushes = bushes.map(bush => new Bush(bush))
    saveState('bushes', bushes)
  },
  SET_CURRENT(state, id) {
    state.current = id
  },
}

export const getters = {
  bushes({ bushes }) {
    return bushes
  },
  currentBush({ bushes, current }) {
    const [bush] = bushes.filter(bush => bush.id == current)
    return bush
  },
}

export const actions = {
  async get({ commit }) {
    const { data } = await bushesApi.get()
    commit('SET_BUSHES', data.data)
    return data.data
  },
  current({ commit }, id) {
    commit('SET_CURRENT', id)
  },
}

// ===
// Private helpers
// ===
function getSavedState(key) {
  let items = JSON.parse(window.localStorage.getItem(key))
  if (!items) {
    return null
  }
  console.log(items)
  return items.map(bush => new Bush(bush))
}

function saveState(key, state) {
  window.localStorage.setItem(key, JSON.stringify(state))
}

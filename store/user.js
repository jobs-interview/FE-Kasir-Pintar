export const state = () => ({
  user: null,
  role: {},
  lockedDate: new Date(),
})

export const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
  SET_ROLE(state, role) {
    state.role = role
  },
  SET_LOCKEDDATE(state, lockedDate) {
    state.lockedDate = lockedDate
  },
}

export const actions = {
  setUser({ commit }, { user }) {
    commit('SET_USER', user)
  },
  setRole({ commit }, { role }) {
    commit('SET_ROLE', role)
  },
  setLockedDate({ commit }, { lockedDate }) {
    commit('SET_LOCKEDDATE', lockedDate)
  },
}

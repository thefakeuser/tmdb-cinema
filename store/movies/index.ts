import { Module } from 'vuex'
import { RootState } from '../types'
import { actions } from './actions'
import { mutations } from './mutations'
import state from './state'
import { MoviesState } from './types'

const namespaced: boolean = true

export const movies: Module<MoviesState, RootState> = {
  namespaced,
  state,
  actions,
  mutations
}

import Vuex, { StoreOptions } from 'vuex'
import { RootState } from './types'
import { movies } from './movies'

const store: StoreOptions<RootState> = {
  modules: {
    movies
  }
}

export default () => new Vuex.Store<RootState>(store)

import { ActionContext, ActionTree } from 'vuex/types'
import { MovieFiltersQuery, Movie } from '../../contracts/movie'
import { Pagination } from '../../contracts/shared'
import { RootState } from '../types'
import { MoviesState } from './types'

/**
 * Action context specific to movies module
 */
interface MovieActionContext extends ActionContext<MoviesState, RootState>{}

export const actions: ActionTree<MoviesState, RootState> = {

  /**
   * Load movie by movieID.
   *
   * @param {number} id
   */
  async loadMovieById (_: MovieActionContext, id: number): Promise<any> {
    try {
      return await this.$axios.$get(`/movie/${id}`)
    } catch (error) {
      throw new Error(error)
    }
  },

  /**
   * Load a list of movies with applied filters.
   * @param {Filters} filters
   */
  async loadFilteredMovies ({ commit }: MovieActionContext, filters: MovieFiltersQuery<string>): Promise<void> {
    try {
      commit('setPendingState', true)

      const {
        results,
        page,
        total_results,
        total_pages
      } = await this.$axios.$get('/discover/movie', {
        params: {
          ...filters
        }
      })

      commit('setMoviesList', results as Array<Movie>)
      commit('setPagination', { page, total_pages, total_results } as Pagination)
    } catch (error) {
      throw new Error(error)
    } finally {
      commit('setPendingState', false)
    }
  }
}

export default actions

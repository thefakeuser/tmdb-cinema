import { Movie } from '../../contracts/movie'
import { Pagination } from '../../contracts/shared'
import { MoviesState } from './types'

/**
 * Movies state initializer
 */
export const initState = (): MoviesState => ({
  isPending: false,
  list: [] as Array<Movie>,
  pagination: {} as Pagination
})

export default initState

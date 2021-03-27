import { Movie } from '../../contracts/movie'
import { Pagination } from '../../contracts/shared'

export interface MoviesState {
  isPending: boolean;
  list: Array<Movie>;
  pagination: Pagination;
}

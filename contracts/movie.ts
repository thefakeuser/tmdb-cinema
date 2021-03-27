export interface Movie {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: Array<number>;
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

interface FiltersDateInterval {
  gte: string | null;
  lte: string | null;
}

interface FiltersVoteInterval {
  gte: number | null;
  lte: number | null;
}

export interface Filters {
  primary_release_date?: FiltersDateInterval;
  vote_average?: FiltersVoteInterval;
  page?: number;
  with_keywords?: string;
}

export enum ImageAppendPath {
  value = 'https://image.tmdb.org/t/p/original'
}

export interface MovieFiltersQuery<T> {
  [key: string]: T;
}

export interface FilterForm {
  minYear?: string;
  maxYear?: string;
  searchQuery?: string;
  maxRating?: number;
  minRating?: number;
  page?: number
}

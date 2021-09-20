import { Media, Movie, TvShow } from './Media';

export interface Result extends Media, Partial<Movie>, Partial<TvShow> {}

export interface Response {
	page: number;
	total_pages: number;
	total_results: number;
	results: Result[];
}

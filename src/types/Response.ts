import { Media, Movie, TvShow } from './Media';

interface Response {
	page: number;
	total_pages: number;
	total_results: number;
}

export interface DiscoverResult
	extends Media,
		Partial<Movie>,
		Partial<TvShow> {}

export interface DiscoverResponse extends Response {
	results: DiscoverResult[];
}

export interface Media {
	backdrop_path: string | null;
	genre_ids: number[];
	id: number;
	original_language: string;
	overview: string;
	popularity: number;
	poster_path: string | null;
	vote_average: number;
	vote_count: number;
}

export interface Movie {
	adult: boolean;
	original_title: string;
	release_date: string;
	title: string;
	video: boolean;
}

export interface TvShow {
	first_air_date: string;
	name: string;
	origin_country: string;
	original_name: string;
}

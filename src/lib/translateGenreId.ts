const genreTable = {
	filmer: [
		{ id: 28, name: 'Action' },
		{ id: 12, name: 'Eventyr' },
		{ id: 16, name: 'Animasjon' },
		{ id: 35, name: 'Komedie' },
		{ id: 80, name: 'Forbrytelser' },
		{ id: 99, name: 'Dokumentar' },
		{ id: 18, name: 'Drama' },
		{ id: 10751, name: 'Familie' },
		{ id: 14, name: 'Fantasy' },
		{ id: 36, name: 'Historisk' },
		{ id: 27, name: 'Horror' },
		{ id: 10402, name: 'Musikal' },
		{ id: 9648, name: 'Mysterier' },
		{ id: 10749, name: 'Romantisk' },
		{ id: 878, name: 'Science Fiction' },
		{ id: 10770, name: 'TV-film' },
		{ id: 53, name: 'Thriller' },
		{ id: 10752, name: 'Krig' },
		{ id: 37, name: 'Western' },
	],
	serier: [
		{ id: 10759, name: 'Action' },
		{ id: 16, name: 'Animasjon' },
		{ id: 35, name: 'Komedie' },
		{ id: 80, name: 'Forbrytelser' },
		{ id: 99, name: 'Dokumentar' },
		{ id: 18, name: 'Drama' },
		{ id: 10751, name: 'Familie' },
		{ id: 10762, name: 'For barn' },
		{ id: 9648, name: 'Mysterier' },
		{ id: 10763, name: 'Nyheter' },
		{ id: 10764, name: 'Reality' },
		{ id: 10765, name: 'Fantasy' },
		{ id: 10766, name: 'Såpeopera' },
		{ id: 10767, name: 'Talkshow' },
		{ id: 10768, name: 'Politisk' },
		{ id: 37, name: 'Western' },
	],
};

const translateGenreId = (id: number, media: 'filmer' | 'serier'): string => {
	const genre = genreTable[media].find(obj => obj.id === id);
	return genre?.name || '';
};

export default translateGenreId;

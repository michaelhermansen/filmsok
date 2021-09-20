const correctQueryObj = ({
	media,
	originalQueryObject,
}: {
	media: 'filmer' | 'serier';
	originalQueryObject: NodeJS.Dict<string | string[]>;
}) => {
	const query = { ...originalQueryObject };
	if (query.sort_by === 'top_rated') delete query.top_rated;

	if (query.from_date) {
		if (media === 'filmer') {
			query['primary_release_date.gte'] = originalQueryObject.from_date;
		} else if (media === 'serier') {
			query['first_air_date.gte'] = originalQueryObject.from_date;
		}
		delete query.from_date;
	}

	if (query.to_date) {
		if (media === 'filmer') {
			query['primary_release_date.lte'] = originalQueryObject.to_date;
		} else if (media === 'serier') {
			query['first_air_date.lte'] = originalQueryObject.to_date;
		}
		delete query.to_date;
	}

	return query;
};

export default correctQueryObj;

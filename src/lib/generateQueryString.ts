const generateQueryString = (queryObject: NodeJS.Dict<string | string[]>) => {
	const queryParamKeys = Object.keys(queryObject);
	const queryParamValues = Object.values(queryObject);

	const queryString = queryParamKeys
		.map((key, i) => `&${key}=${queryParamValues[i]}`)
		.join('')
		.replace('&', '?');

	return queryString;
};

export default generateQueryString;

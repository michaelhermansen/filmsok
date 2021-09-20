const getRatingColor = (rating: number): string => {
	if (rating < 3) return ' bg-red-700';
	if (rating < 7) return ' bg-yellow-500';
	return ' bg-green-400';
};

export default getRatingColor;

import { DiscoverResult } from '../types/Response';
import Image from 'next/image';

interface MediaItemProps {
	media: DiscoverResult;
}

const MediaItem: React.FC<MediaItemProps> = ({ media }) => {
	const mediaDate = media.release_date || media.first_air_date || '';
	const mediaYear = mediaDate.substring(0, 4);

	return (
		<div className='p-2 flex gap-4 items-center rounded-lg hover:bg-white hover:shadow-xl transition-all duration-300'>
			<div className='bg-gray-300 h-40 w-28 rounded-md flex-shrink-0 relative overflow-hidden'>
				<Image
					src={`https://image.tmdb.org/t/p/w300/${media.poster_path}`}
					width={250}
					height={360}
					objectFit='cover'
				/>
			</div>
			<div className='pr-2'>
				<h2 className='mb-2 font-semibold'>{media.title || media.name}</h2>
				<p>{mediaYear}</p>
				<p className='mt-8'>{media.vote_average.toFixed(1)}</p>
			</div>
		</div>
	);
};

export default MediaItem;

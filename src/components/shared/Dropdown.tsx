import { ChevronDownIcon } from '@heroicons/react/solid';
import { LoadingContext } from '../../lib/loadingContext';
import { useContext } from 'react';

interface DropdownProps extends React.HTMLProps<HTMLSelectElement> {
	options: {
		value: string;
		label: string;
	}[];
	value: string;
	setValue: React.Dispatch<string>;
	className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
	options,
	value,
	setValue,
	className,
	...rest
}) => {
	const { loading } = useContext(LoadingContext);

	return (
		<div className={className}>
			<div className='flex items-center relative w-full'>
				<select
					name='media'
					id='media'
					value={value}
					onChange={e => setValue(e.target.value)}
					disabled={loading}
					className='pl-4 pr-11 py-2 border border-gray-200 bg-white rounded-lg appearance-none w-full font-medium'
					{...rest}
				>
					{options.map((option, i) => (
						<option key={i} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
				<ChevronDownIcon className='w-4 h-4 pointer-events-none absolute right-4' />
			</div>
		</div>
	);
};

export default Dropdown;

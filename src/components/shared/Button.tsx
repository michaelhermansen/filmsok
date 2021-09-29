interface ButtonProps {
	onClick?: () => void;
	Icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
	children: any;
	className?: string;
	type?: 'button' | 'reset' | 'submit';
}

const Button: React.FC<ButtonProps> = ({
	onClick,
	Icon,
	children,
	className = '',
	type = 'button',
}) => {
	return (
		<button
			type={type}
			onClick={onClick}
			className={[
				'px-5 py-2 bg-gray-200 font-medium rounded-lg flex gap-2 items-center dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200',
				className,
			].join(' ')}
		>
			{children}
			{Icon && <Icon className='w-4 h-4' />}
		</button>
	);
};

export default Button;

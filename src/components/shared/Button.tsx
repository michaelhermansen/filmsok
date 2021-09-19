interface ButtonProps {
	children: any;
	onClick: () => void;
	Icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, Icon }) => {
	return (
		<button
			onClick={onClick}
			className='px-5 py-2 bg-gray-200 font-medium rounded-lg flex gap-2 items-center'
		>
			{children}
			{Icon && <Icon className='w-4 h-4' />}
		</button>
	);
};

export default Button;

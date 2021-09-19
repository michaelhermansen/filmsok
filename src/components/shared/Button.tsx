interface ButtonProps {
	children: any;
	Icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
}

const Button: React.FC<ButtonProps> = ({ children, Icon }) => {
	return (
		<button className='px-5 py-2 bg-gray-200 font-medium rounded-lg flex gap-2 items-center'>
			{children}
			{Icon && <Icon className='w-4 h-4' />}
		</button>
	);
};

export default Button;

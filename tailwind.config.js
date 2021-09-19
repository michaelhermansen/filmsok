module.exports = {
	purge: [
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
	],
	darkMode: false, // or 'media' or 'class'
	theme: {
		fontFamily: {
			sans: ['IBM Plex Sans', 'sans-serif'],
		},
		fontSize: {
			sm: ['14px', '20px'],
			base: ['18px', '24px'],
			lg: ['28px', '32px'],
			xl: ['34px', '36px'],
		},
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};

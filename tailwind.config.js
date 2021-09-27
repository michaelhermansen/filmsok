const colors = require('tailwindcss/colors');

module.exports = {
	purge: [
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
	],
	darkMode: 'media',
	theme: {
		fontFamily: {
			sans: ['IBM Plex Sans', 'sans-serif'],
		},
		fontSize: {
			sm: ['16px', '20px'],
			base: ['18px', '24px'],
			lg: ['28px', '32px'],
			xl: ['34px', '36px'],
		},
		extend: {
			colors: {
				gray: colors.trueGray,
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};

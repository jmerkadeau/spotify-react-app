import { createTheme } from '@mui/material/styles';

let theme = createTheme({
	palette: {
		primary: {
			main: "#58A1C1",
			light: "#8BD2F4",
			dark: "#1E7291",
		},
		secondary: {
			main: '#dd7c85',
			light: '#ffadb5',
			dark: '#a94e58'
		},
		background: "#F9F9F9",
		foreground: "#FBFBFB",
		grey: {
			A100: '#F3F4F8',
			A200: '#D2D4DA',
			A300: "#B3B5BD",
			A400: '#9496A1',
			A500: '#777986',
			A600: '#5B5D6B',
			A700: '#404252',
            A800: '#282A3A',
            A900: '#101223',
		},
		white: "#FFFFFF",
		gradients: {
			orangeLinear: {
				normal: 'linear-gradient(to bottom, #FFC050, #FAA100)',
				hover: 'linear-gradient(to bottom, #e8a83a, #e69600)',
				active: 'linear-gradient(to bottom, #e89200, #da8e00)'
			},
			blueLinear: {
				normal:  'linear-gradient(to bottom, #5EBCE4, #009BDF)',
				hover:  'linear-gradient(to bottom, #5BB1D6, #0091CF)',
				active:  'linear-gradient(to bottom, #53A2C4, #0088C2)',
			}
		},
		action: {
			hover: '#EFEFEF',
			selected: "#E9E9E9"
		}
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 975,
			lg: 1250,
			xl: 1920,
		},
	},
});

export default theme;
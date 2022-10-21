import '../styles/globals.scss'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Nav from '../components/Nav/Nav'

/**
 *
 * @todo - rerender reel frame
 * @todo - rerender projects frame
 * @todo ** seperate shadow and layer of the above
 * @todo - progress bar on nav change
 * @todo - correct page crumbs by nav
 *
 */

const THEME = createTheme({
	palette: {
		orange: {
			main: '#DA9A62',
		},
		white: {
			main: '#FFFFFF',
		},
		peach: {
			main: '#FF715B',
		},
		blue: {
			main: '#267B9C',
		},
	},
})

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		secondary: {
			main: '#ffffff',
		},
	},
})

function MyApp({ Component, pageProps }) {
	const router = useRouter()
	console.log()
	return (
		<>
			<ThemeProvider theme={THEME}>
				{router.pathname !== '/admin' && <Nav path={router.pathname} />}
				<AnimatePresence mode="wait">
					<Component {...pageProps} key={router.pathname} />
				</AnimatePresence>
			</ThemeProvider>
		</>
	)
}

export default MyApp

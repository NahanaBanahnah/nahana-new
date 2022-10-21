import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from './nav.module.scss'
import {
	fabOn,
	fabOff,
	navDrawerIn,
	navLinksOutNavigate,
	navigateWipe,
	wipeOut,
	navDrawerOut,
	navLinksOutClose,
} from '../../util/animation'

const Nav = ({ path }) => {
	const router = useRouter()

	const [MENU_STATE, setMenuState] = useState(false)
	const [LINKS_ON, setLinksOn] = useState(false)
	const [HOVERING, setHovering] = useState(false)

	const PATH = path === '/' ? 'index' : path.replace('/', '')
	const NAV_COLOR = styles[PATH]
	const CRUMB_CLASS = [styles.crumb]
	const NAV_CLASS = [styles.mainNav]

	if (LINKS_ON) {
		NAV_CLASS.push(styles.on)
	}
	if (HOVERING) {
		CRUMB_CLASS.push(styles.on)
	}
	if (MENU_STATE) {
		CRUMB_CLASS.push(styles.hide)
	}

	useEffect(() => {
		if (MENU_STATE) {
			setLinksOn(true)
			fabOn()
			navDrawerIn()
		}

		const OUT = async () => {
			fabOff()
			navLinksOutClose()
			await navDrawerOut()
			setLinksOn(false)
		}
		if (!MENU_STATE) {
			OUT()
		}
	}, [MENU_STATE])

	const toggleFabState = () => {
		setMenuState(value => !value)
	}

	const handleClick = async (e, path) => {
		e.preventDefault()

		navLinksOutNavigate()
		await navigateWipe(path)
		await router.push(path)
		await wipeOut()
		fabOff()
		setMenuState(false)
		setLinksOn(false)
	}

	return (
		<>
			<div className={styles.fabContainer}>
				<div className={CRUMB_CLASS.join(' ')}>
					<div>Demo Reel</div>
					<div>Navigate</div>
				</div>
				<div
					onClick={toggleFabState}
					className={styles.fab}
					onMouseEnter={() => setHovering(true)}
					onMouseLeave={() => setHovering(false)}
				>
					<b className="top"></b>
					<b className="middle"></b>
					<b className="bottom"></b>
				</div>
			</div>

			<nav className={NAV_CLASS.join(' ')}>
				<div
					exit="exit"
					animate="animate"
					className={[styles.linkContainer, 'linkContainer'].join(
						' '
					)}
				>
					<div className={styles.navHeading}>
						<div className={styles.leftBar}></div>
						<h1 className="heading">NAHANA</h1>
						<div className={styles.rightBar}></div>
					</div>

					<Link href="/" passHref>
						<a
							className="mainLinks"
							onClick={e => handleClick(e, '/')}
						>
							Home
						</a>
					</Link>
					<Link href="/" passHref>
						<a
							className="mainLinks"
							onClick={e => handleClick(e, '/reel')}
						>
							Reel
						</a>
					</Link>
					<Link href="/" passHref>
						<a
							className="mainLinks"
							onClick={e => handleClick(e, '/projects')}
						>
							Projects
						</a>
					</Link>
					<Link href="/" passHref>
						<a className="mainLinks">About Me</a>
					</Link>
				</div>

				<svg
					className={styles.main}
					width="100%"
					height="100%"
					viewBox="0 0 192 108"
					preserveAspectRatio="none"
				>
					<path
						className="morph"
						style={{ fill: NAV_COLOR }}
						d="M215.7 -67.2C223.3 -63.4 222.4 -90.7 192 0C153.8 0 128.6 0 96 0S31.1 0 0 0C-31.4 -89 -32 -60.9 -24.3 -65C-15.1 -69.8 0 -40.2 33.6 -37.3C61.3 -34.9 67.5 -53.6 99.4 -52.7C128.4 -51.9 132.3 -36.1 156.9 -37.9C190.7 -40.3 206.5 -71.7 215.7 -67.2Z"
					/>
				</svg>
			</nav>
		</>
	)
}

export default Nav

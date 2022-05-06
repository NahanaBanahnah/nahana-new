import { useEffect, useRef } from 'react'
import Nav from '../src/components/Nav/Nav'
import useMouse from '@react-hook/mouse-position'

import styles from '../src/components/Home/Home.module.scss'
import triangle_styles from '../src/components/Home/Triangle.module.scss'

import Triangles from '../public/triangle.svg'

import Overlay from '../src/components/Home/Overlay'

const Index = () => {
	const REF = useRef(null)
	const MOUSE = useMouse(REF, {
		enterDelay: 100,
		leaveDelay: 100,
	})

	useEffect(() => {
		const CLASSES = Object.values(triangle_styles)

		const PATHS = document.querySelectorAll('path')
		PATHS.forEach(ele => {
			for (let i = CLASSES.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * i)
				const TMP = CLASSES[i]
				CLASSES[i] = CLASSES[j]
				CLASSES[j] = TMP
			}
			ele.classList.add(CLASSES[0])
		})
	}, [])

	console.log(MOUSE.x)

	return (
		<>
			<Nav />
			<div ref={REF}>
				<Triangles className={styles.triangles} />

				<Overlay
					classes={[styles.gradient, styles.rightLeft]}
					mouse={MOUSE.x}
					position="right"
				/>
				<Overlay
					classes={[styles.dark, styles.rightLeft]}
					mouse={MOUSE.x}
					position="left"
				/>
			</div>
		</>
	)
}

export default Index

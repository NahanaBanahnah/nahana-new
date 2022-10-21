import { useEffect, useRef } from 'react'
import useMouse from '@react-hook/mouse-position'
import { motion } from 'framer-motion'

import Overlay from '../components/Home/Overlay'
import Triangles from '../public/triangle.svg'

import triangle_styles from '../components/Home/Triangle.module.scss'
import styles from '../components/Home/Home.module.scss'

const Index = () => {
	/**
	 * @summary - set up mouse position
	 */

	const REF = useRef(null)
	const MOUSE = useMouse(REF, {
		enterDelay: 100,
		leaveDelay: 100,
	})

	/**
	 * @summary - build random triangle colors
	 */
	useEffect(() => {
		const CLASSES = Object.values(triangle_styles)

		const PATHS = document.querySelectorAll('#triangles > path')
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

	return (
		<motion.div ref={REF}>
			<Triangles id="triangles" className={styles.triangles} />
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
		</motion.div>
	)
}

export default Index

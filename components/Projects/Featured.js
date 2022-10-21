import { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

import styles from './projects.module.scss'

const CONTAINER_VARI = {
	visible: {
		scale: 1,
		transition: { duration: 1, delay: 0.5, ease: [0.55, 0, 0.34, 1] },
	},
	hidden: { scale: 0 },
}
const HEADING_VARI = {
	visible: {
		height: 64,
		y: 0,
		transition: { duration: 0.5, delay: 1.5, ease: [0.55, 0, 0.34, 1] },
	},
	hidden: { y: 64, height: 0 },
}

const IMAGE_VARI = {
	visible: {
		clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
		transition: { duration: 1.5, delay: 0.75, ease: [0.55, 0, 0.34, 1] },
	},
	hidden: { clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)' },
}

const Featured = ({ title, alt, url }) => {
	const controls = useAnimation()
	const [ref, inView] = useInView()

	useEffect(() => {
		if (inView) {
			controls.start('visible')
		}
	}, [controls, inView])

	const ALIGN = alt ? styles.right : styles.left
	const ANCHOR = alt ? 'end' : 'start'
	const X = alt ? '100%' : '0'

	return (
		<motion.div ref={ref} className={ALIGN}>
			<svg viewBox="0 0 818 120">
				<defs>
					<clipPath id={url}>
						<motion.rect
							animate={controls}
							variants={HEADING_VARI}
							initial="hidden"
							x="0"
							y="0"
							width="100%"
							height="64"
						/>
					</clipPath>
				</defs>
				<text
					y="70"
					x={X}
					text-anchor={ANCHOR}
					clip-path={`url(#${url})`}
				>
					{title}
				</text>
			</svg>
			<motion.div
				className={styles.imageContainer}
				animate={controls}
				variants={CONTAINER_VARI}
				initial="hidden"
			>
				<motion.div
					className={styles.featured}
					animate={controls}
					variants={IMAGE_VARI}
					initial="hidden"
				>
					<Image
						src="/img/superBowl.png"
						alt="Super Bowl"
						width={818}
						height={460}
						layout="fixed"
					/>
				</motion.div>
			</motion.div>
		</motion.div>
	)
}

export default Featured

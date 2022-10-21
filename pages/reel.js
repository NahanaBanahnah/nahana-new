import Image from 'next/image'
import { useEffect } from 'react'

import { Container } from '@mui/system'
import { motion } from 'framer-motion'
import styles from '../components/Reel/reel.module.scss'

import { titleAnimate } from '../util/animation'

import Frame from '../public/img/layout/demo_container.webp'
import Title from '../public/img/layout/nahana_title.svg'
import DemoReel from '../public/img/layout/demo_reel.svg'

const FADE_UP = {
	initial: {
		y: 100,
		opacity: 0,
	},
	animate: {
		y: 0,
		opacity: 1,
		transition: { ease: 'easeInOut', duration: 0.75 },
	},
}

const SLIDE_RIGHT = {
	initial: {
		x: -50,
		opacity: 0,
	},
	animate: {
		x: 0,
		opacity: 1,
		transition: { ease: 'easeInOut', duration: 0.75 },
	},
}

const SLIDE_LEFT = {
	initial: {
		x: 50,
		opacity: 0,
	},
	animate: {
		x: 0,
		opacity: 1,
		transition: { ease: 'easeInOut', duration: 0.75 },
	},
}

const Reel = () => {
	useEffect(() => {
		titleAnimate()
	}, [])
	return (
		<>
			<motion.section
				className={styles.reel}
				initial="initial"
				animate="animate"
			>
				<motion.div variants={SLIDE_RIGHT}>
					<Title className={styles.title} />
				</motion.div>
				<motion.div variants={SLIDE_LEFT}>
					<DemoReel className={styles.sideTitle} />
				</motion.div>

				<Container
					maxWidth="xl"
					fixed
					className={styles.container}
					disableGutters={true}
				>
					<motion.div className={styles.subContainer}>
						<motion.div
							className={styles.videoContainer}
							variants={FADE_UP}
						>
							{/* <video controls>
								<source
									src="/vid/2021_demo_reel.mp4"
									type="video/mp4"
								/>
							</video> */}
						</motion.div>
						<motion.div
							className={styles.imageContainer}
							variants={FADE_UP}
						>
							<Image
								className={styles.reelContainer}
								src={Frame}
								width={1792}
								height={836}
								layout="responsive"
								alt="Nahana's Demo Reel"
								placeholder="blur"
							/>
						</motion.div>
					</motion.div>
				</Container>
			</motion.section>
		</>
	)
}

export default Reel

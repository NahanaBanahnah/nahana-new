import { useEffect } from 'react'

import { Container } from '@mui/system'
import { motion } from 'framer-motion'
import styles from '../components/Projects/projects.module.scss'

import { titleAnimate } from '../util/animation'
import { supabase } from '../util/supabaseClient'

import Title from '../public/img/layout/nahana_title.svg'
import ProjectsSide from '../public/img/layout/projects.svg'
import Featured from '../components/Projects/Featured'
import Archive from '../components/Projects/Archive'

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
const Projects = ({ featured }) => {
	useEffect(() => {
		titleAnimate()
	}, [])

	return (
		<>
			<motion.section
				className={styles.projects}
				initial="initial"
				animate="animate"
			>
				<motion.div variants={SLIDE_RIGHT}>
					<Title className={styles.title} />
				</motion.div>
				<motion.div variants={SLIDE_LEFT}>
					<ProjectsSide className={styles.sideTitle} />
				</motion.div>

				<Container
					maxWidth="xl"
					fixed
					className={styles.container}
					disableGutters={true}
				>
					<div className={styles.heroContainer}>
						<div className={styles.imageContainer}>
							{/* <Image
								className={styles.hero}
								src={Hero}
								width={1372}
								height={836}
								layout="responsive"
								alt="Projects"
								placeholder="blur"
							/> */}
						</div>
					</div>

					<div className={styles.featured}>
						{featured.map((ele, i) => {
							let alt = i % 2 === 0 ? false : true

							return (
								<Featured
									key={ele.ProjectId}
									title={ele.ProjectName}
									alt={alt}
									url={ele.URL}
								/>
							)
						})}
					</div>
					<Archive />
				</Container>
			</motion.section>
		</>
	)
}

export default Projects

export const getServerSideProps = async () => {
	const { data } = await supabase
		.from('Projects')
		.select()
		.order('ProjectId')
		.eq('Featured', true)

	return {
		props: {
			featured: data,
		},
	}
}

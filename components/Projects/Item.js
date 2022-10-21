import styles from './archive.module.scss'
import { motion } from 'framer-motion'
import Role from './Role'

const Item = ({ year, project, client, categories, type, index }) => {
	const DELAY = 0.05
	const DURATION = 0.45
	return (
		<motion.div
			className={styles.item}
			initial={{ x: 100, opacity: 0 }}
			animate={{
				x: 0,
				opacity: 1,
				transition: {
					ease: 'easeOut',
					duration: DURATION,
					delay: index * DELAY,
				},
			}}
			exit={{
				opacity: 0,
				x: -50,
				transition: {
					ease: 'easeIn',
					duration: DURATION,
					delay: index * DELAY,
				},
			}}
		>
			<div className={styles.itemRow}>
				<div className={styles.date}>{year}</div>
				<div className={styles.project}>{project}</div>
				<div className={styles.client}>{client}</div>
				<div className={styles.categories}>
					<Role roles={categories} index={index} />
				</div>
				<div className={styles.type}>{type}</div>
			</div>
			<div className={styles.itemRowMask}>
				<div className={styles.date}>{year}</div>
				<div className={styles.project}>{project}</div>
				<div className={styles.client}>{client}</div>
				<div className={styles.categories}>
					<Role roles={categories} index={index} />
				</div>
				<div className={styles.type}>{type}</div>
			</div>
		</motion.div>
	)
}

export default Item

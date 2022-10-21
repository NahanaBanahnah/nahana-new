import styles from './Home.module.scss'

const Overlay = ({ classes, mouse, position }) => {
	let mouseClip = mouse == null ? '50%' : `${mouse}px`
	let mask =
		position == 'right'
			? `${mouseClip} 0%, 100% 0, 100% 100%, ${mouseClip} 100%`
			: `0 0, ${mouseClip} 0, ${mouseClip} 100%, 0% 100%`

	return (
		<div
			className={classes.join(' ')}
			style={{
				clipPath: `polygon(${mask})`,
			}}
		>
			<div className={styles.space}></div>
			<div className={styles.title}>Nahana</div>
			<div className={styles.dev}>Developer</div>
			<div className={styles.dream}>Dreamer</div>
			<div className={styles.des}>Designer</div>
		</div>
	)
}

export default Overlay

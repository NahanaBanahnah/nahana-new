import Nav from '../src/components/Nav/Nav'

import styles from '../src/components/Reel/reel.module.scss'

const Reel = () => {
	return (
		<>
			<Nav />
			<section className={styles.reel}></section>
		</>
	)
}

export default Reel

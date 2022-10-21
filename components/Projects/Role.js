import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const Role = ({ roles, index }) => {
	const [CURRENT, setCurrent] = useState(0)
	const [CURRENT_ROLE, setCurrentRole] = useState(roles[0])
	const DELAY = 0.1
	const DURATION = 0.8

	useEffect(() => {
		const getNext = () => {
			let length = roles.length
			let next = CURRENT === roles.length - 1 ? 0 : CURRENT + 1
			setCurrentRole(roles[next])
			setCurrent(next)
			console.log(CURRENT_ROLE)
		}

		const INTERVAL = setInterval(getNext, 5000)

		return () => clearInterval(INTERVAL)
	}, [CURRENT_ROLE])

	return (
		<AnimatePresence>
			<motion.div
				key={CURRENT_ROLE}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{
					ease: 'easeIn',
					duration: DURATION,
					delay: index * DELAY,
				}}
			>
				{CURRENT_ROLE}
			</motion.div>
		</AnimatePresence>
	)
}

export default Role

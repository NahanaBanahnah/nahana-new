import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Item from './Item'
import styles from './archive.module.scss'
import { supabase } from '../../util/supabaseClient'
import { Button, MobileStepper } from '@mui/material'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'

const Archive = () => {
	const [ARCHIVE, setArchive] = useState(false)
	const [DISPLAY, setDisplay] = useState(false)
	const [PAGE, setPage] = useState(1)
	const [TOTAL_PAGES, setTotalPages] = useState(1)
	const PAGE_SIZE = 20

	useEffect(() => {
		const runQuery = async () => {
			const { data } = await supabase
				.from('Projects')
				.select('*, ProjectTypes(ProjectType)')
				.eq('Active', true)

			setArchive(data)
		}

		runQuery()
	}, [])

	useEffect(() => {
		if (ARCHIVE) {
			setDisplay(ARCHIVE.slice((PAGE - 1) * PAGE_SIZE, PAGE_SIZE * PAGE))
			setTotalPages(Math.ceil(ARCHIVE.length / PAGE_SIZE))
		}
	}, [ARCHIVE, PAGE])

	const handleNext = () => {
		setPage(c => c + 1)
	}
	const handleBack = () => {
		setPage(c => c - 1)
	}

	return (
		<div className={styles.container}>
			<motion.div className={styles.archives}>
				<AnimatePresence mode="wait">
					{DISPLAY &&
						DISPLAY.map((item, i) => {
							let date = item.Date.split('-')
							let roles = JSON.parse(item.ProjectRoles).map(
								item => item.Role
							)

							return (
								<Item
									key={item.ProjectId}
									index={i}
									year={date[0]}
									project={item.ProjectName}
									client={item.Client}
									categories={roles}
									type={item.ProjectTypes.ProjectType}
								/>
							)
						})}
				</AnimatePresence>
				<div className={styles.borders}>
					{Array(DISPLAY.length)
						.fill()
						.map(item => (
							<div key={item} className={styles.spacer} />
						))}
				</div>

				{ARCHIVE.length > 20 && (
					<MobileStepper
						variant="progress"
						steps={TOTAL_PAGES}
						position="static"
						activeStep={PAGE - 1}
						sx={{ width: 800, flexGrow: 1, justifySelf: 'center' }}
						nextButton={
							<Button
								color="white"
								variant="outlined"
								onClick={handleNext}
								disabled={PAGE === TOTAL_PAGES}
								endIcon={<KeyboardArrowRight />}
							>
								Next
							</Button>
						}
						backButton={
							<Button
								color="white"
								variant="outlined"
								onClick={handleBack}
								disabled={PAGE - 1 === 0}
								startIcon={<KeyboardArrowLeft />}
							>
								Back
							</Button>
						}
					/>
				)}
			</motion.div>
		</div>
	)
}

export default Archive

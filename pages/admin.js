import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Container } from '@mui/system'
import { supabase } from '../util/supabaseClient'
import styles from '../components/Admin/admin.module.scss'
import Dropzone from '../components/Dropzone/Dropzone'

import {
	Button,
	Checkbox,
	CssBaseline,
	FormControl,
	InputLabel,
	ListItemText,
	MenuItem,
	MobileStepper,
	OutlinedInput,
	Select,
	Switch,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TextField,
} from '@mui/material'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import { differenceWith, isEqual } from 'lodash'

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		secondary: {
			main: '#ffffff',
		},
	},
})

const Admin = () => {
	const router = useRouter()

	const [LOADED, setLoaded] = useState(false)
	const [CURRENT, setCurrent] = useState(false)
	const [PROJECTS, setProjects] = useState(false)
	const [DISPLAY, setDisplay] = useState(false)
	const [ALL_TOOLS, setAllTools] = useState(false)
	const [ALL_ROLES, setAllRoles] = useState([])
	const [CURRENT_ROLES, setCurrentRoles] = useState(false)
	const [TYPES, setTypes] = useState(false)

	const [PAGE, setPage] = useState(1)
	const [TOTAL_PAGES, setTotalPages] = useState(1)
	const PAGE_SIZE = 10

	useEffect(() => {
		const checkSession = async () => {
			const session = await supabase.auth.session()
			if (!session) {
				router.push('/login')
			} else {
				setLoaded(true)
			}
		}

		checkSession()
	}, [])

	useEffect(() => {
		const qur = async () => {
			const { data: Projects } = await supabase
				.from('Projects')
				.select()
				.order('Active', { ascending: false })
				.order('ProjectId', { ascending: true })

			const { data: Tools } = await supabase.from('Tools').select()
			const { data: Roles } = await supabase.from('Roles').select()
			const { data: Types } = await supabase.from('ProjectTypes').select()

			setProjects(Projects)
			setAllTools(Tools.sort((a, b) => a.Tool.localeCompare(b.Tool)))
			setAllRoles(Roles.sort((a, b) => a.Role.localeCompare(b.Role)))
			setTypes(Types)
		}
		qur()
	}, [])

	useEffect(() => {
		if (PROJECTS) {
			setDisplay(PROJECTS.slice((PAGE - 1) * PAGE_SIZE, PAGE_SIZE * PAGE))
			setTotalPages(Math.ceil(PROJECTS.length / PAGE_SIZE))
		}
	}, [PROJECTS, PAGE])

	const handleNext = () => {
		setPage(c => c + 1)
	}
	const handleBack = () => {
		setPage(c => c - 1)
	}

	const saveEdit = async e => {
		e.target.style.backgroundColor = 'transparent'
		const c = e.target
		const VALUE = c.textContent

		if (VALUE !== CURRENT) {
			let insert = {
				[c.dataset.row]: VALUE,
			}

			const { error } = await supabase
				.from('Projects')
				.update(insert)
				.eq('ProjectId', c.dataset.id)

			console.log(error)
		}
	}
	const setEdit = e => {
		e.target.style.backgroundColor = '#386c865c'
		setCurrent(e.target.textContent)
	}

	const saveExtra = async (e, dataset) => {
		let value = e.target.value
		if (dataset.checkbox) {
			value = e.target.checked
		}

		let k = Object.keys(PROJECTS).find(
			key => PROJECTS[key].ProjectId === parseInt(dataset.id)
		)
		let projects = [...PROJECTS]
		projects[k][dataset.row] = value

		setProjects(projects)

		const { error } = await supabase
			.from('Projects')
			.update({ [dataset.row]: value })
			.eq('ProjectId', dataset.id)

		console.log(error)
	}

	const handleChange = (event, dataset) => {
		const {
			target: { value },
		} = event

		let idRow = dataset.row === 'ProjectRoles' ? 'RoleId' : 'ToolId'
		let k = Object.keys(PROJECTS).find(
			key => PROJECTS[key].ProjectId === parseInt(dataset.id)
		)
		let projects = [...PROJECTS]
		let added = value.at(-1)
		let current = projects[k][dataset.row]
			? JSON.parse(projects[k][dataset.row])
			: []

		let index = current.findIndex(item => {
			return item[idRow] === added[idRow]
		})

		index !== -1 ? current.splice(index, 1) : current.push(added)
		projects[k][dataset.row] = JSON.stringify(current)
		setProjects(projects)
	}

	const handleListClose = async (event, dataset) => {
		let k = Object.keys(PROJECTS).find(
			key => PROJECTS[key].ProjectId === parseInt(dataset.id)
		)
		let editRoles = JSON.parse(PROJECTS[k][dataset.row])

		let diff = differenceWith(editRoles, CURRENT_ROLES, isEqual)

		if (diff.length > 0) {
			const { error } = await supabase
				.from('Projects')
				.update({ [dataset.row]: JSON.stringify(editRoles) })
				.eq('ProjectId', dataset.id)

			console.log(error)
		}
	}

	const handleListOpen = (even, dataset) => {
		let k = Object.keys(PROJECTS).find(
			key => PROJECTS[key].ProjectId === parseInt(dataset.id)
		)

		setCurrentRoles(JSON.parse(PROJECTS[k][dataset.row]))
	}

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<Container maxWidth="xl" disableGutters>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Project</TableCell>
							<TableCell>Client</TableCell>
							<TableCell>Date</TableCell>
							<TableCell>URL</TableCell>
							<TableCell>Project Type</TableCell>
							<TableCell>Featured</TableCell>
							<TableCell>On Going</TableCell>
							<TableCell>Active</TableCell>
							<TableCell>Category</TableCell>
							<TableCell>Tools</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{DISPLAY &&
							DISPLAY.map((item, i) => {
								item.ProjectTypeId = item.ProjectTypeId
									? item.ProjectTypeId
									: ''
								let projectRoles = JSON.parse(item.ProjectRoles)
								let projectTools = JSON.parse(item.ProjectTools)

								return (
									<>
										<TableRow key={item.ProjectId}>
											<TableCell sx={{ py: 1 }}>
												<div
													className={styles.edit}
													data-id={item.ProjectId}
													data-row="ProjectName"
													contentEditable="true"
													onBlur={saveEdit}
													onFocus={setEdit}
												>
													{item.ProjectName}
												</div>
											</TableCell>

											<TableCell sx={{ py: 1 }}>
												<div
													className={styles.edit}
													data-id={item.ProjectId}
													data-row="Client"
													contentEditable="true"
													onBlur={saveEdit}
													onFocus={setEdit}
												>
													{item.Client}
												</div>
											</TableCell>

											<TableCell sx={{ py: 1 }}>
												<TextField
													size="small"
													inputProps={{
														'data-id':
															item.ProjectId,
														'data-row': 'Date',
													}}
													type="date"
													value={item.Date}
													onChange={e =>
														saveExtra(e, {
															id: item.ProjectId,
															row: 'Date',
														})
													}
												/>
											</TableCell>

											<TableCell sx={{ py: 1 }}>
												<div
													className={styles.edit}
													data-id={item.ProjectId}
													data-row="URL"
													contentEditable="true"
													onBlur={saveEdit}
													onFocus={setEdit}
												>
													{item.URL}
												</div>
											</TableCell>

											<TableCell sx={{ py: 1 }}>
												<FormControl fullWidth>
													<InputLabel>
														Type
													</InputLabel>
													<Select
														value={
															item.ProjectTypeId
														}
														fullWidth
														size="small"
														onChange={e =>
															saveExtra(e, {
																id: item.ProjectId,
																row: 'ProjectTypeId',
															})
														}
													>
														{TYPES &&
															TYPES.map(item => (
																<MenuItem
																	key={
																		item.ProjectTypeId
																	}
																	value={
																		item.ProjectTypeId
																	}
																>
																	{
																		item.ProjectType
																	}
																</MenuItem>
															))}
													</Select>
												</FormControl>
											</TableCell>

											<TableCell sx={{ py: 1 }}>
												<Switch
													checked={item.Featured}
													onChange={e =>
														saveExtra(e, {
															id: item.ProjectId,
															row: 'Featured',
															checkbox: true,
														})
													}
												/>
											</TableCell>

											<TableCell sx={{ py: 1 }}>
												<Switch
													checked={item.Ongoing}
													onChange={e =>
														saveExtra(e, {
															id: item.ProjectId,
															row: 'Ongoing',
															checkbox: true,
														})
													}
												/>
											</TableCell>

											<TableCell sx={{ py: 1 }}>
												<Switch
													checked={item.Active}
													onChange={e =>
														saveExtra(e, {
															id: item.ProjectId,
															row: 'Active',
															checkbox: true,
														})
													}
												/>
											</TableCell>

											<TableCell sx={{ py: 1 }}>
												<FormControl
													sx={{ width: 200 }}
												>
													<InputLabel size="small">
														Category
													</InputLabel>
													<Select
														multiple
														size="small"
														value={
															projectRoles
																? projectRoles
																: []
														}
														onChange={e =>
															handleChange(e, {
																id: item.ProjectId,
																row: 'ProjectRoles',
															})
														}
														onClose={e =>
															handleListClose(e, {
																id: item.ProjectId,
																row: 'ProjectRoles',
															})
														}
														onOpen={e =>
															handleListOpen(e, {
																row: 'ProjectRoles',
																id: item.ProjectId,
															})
														}
														input={
															<OutlinedInput label="Tag" />
														}
														renderValue={selected =>
															selected.map(
																item =>
																	`${item.Role}, `
															)
														}
													>
														{ALL_ROLES.map(r => {
															return (
																<MenuItem
																	key={
																		r.RoleId
																	}
																	value={r}
																>
																	<Checkbox
																		checked={
																			projectRoles &&
																			projectRoles.find(
																				roleItem =>
																					roleItem.RoleId ==
																					r.RoleId
																			)
																		}
																	/>
																	<ListItemText
																		primary={
																			r.Role
																		}
																	/>
																</MenuItem>
															)
														})}
													</Select>
												</FormControl>
											</TableCell>

											<TableCell sx={{ py: 1 }}>
												<FormControl
													sx={{ width: 200 }}
												>
													<InputLabel size="small">
														Tools
													</InputLabel>
													<Select
														multiple
														size="small"
														value={
															projectTools
																? projectTools
																: []
														}
														onChange={e =>
															handleChange(e, {
																id: item.ProjectId,
																row: 'ProjectTools',
															})
														}
														onClose={e =>
															handleListClose(e, {
																id: item.ProjectId,
																row: 'ProjectTools',
															})
														}
														onOpen={e =>
															handleListOpen(e, {
																row: 'ProjectTools',
																id: item.ProjectId,
															})
														}
														input={
															<OutlinedInput label="Tag" />
														}
														renderValue={selected =>
															selected.map(
																item =>
																	`${item.Tool}, `
															)
														}
													>
														{ALL_TOOLS.map(r => {
															return (
																<MenuItem
																	key={
																		r.ToolId
																	}
																	value={r}
																>
																	<Checkbox
																		checked={
																			projectTools &&
																			projectTools.find(
																				toolItem =>
																					toolItem.ToolId ==
																					r.ToolId
																			)
																		}
																	/>
																	<ListItemText
																		primary={
																			r.Tool
																		}
																	/>
																</MenuItem>
															)
														})}
													</Select>
												</FormControl>
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell colSpan={10}>
												<Dropzone />
											</TableCell>
										</TableRow>
									</>
								)
							})}
					</TableBody>
				</Table>
				<MobileStepper
					variant="progress"
					steps={TOTAL_PAGES}
					position="static"
					activeStep={PAGE - 1}
					sx={{ width: 800, flexGrow: 1, justifySelf: 'center' }}
					nextButton={
						<Button
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
							variant="outlined"
							onClick={handleBack}
							disabled={PAGE - 1 === 0}
							startIcon={<KeyboardArrowLeft />}
						>
							Back
						</Button>
					}
				/>
			</Container>
		</ThemeProvider>
	)
}
export default Admin

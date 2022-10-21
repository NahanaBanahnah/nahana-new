import { useState } from 'react'
import { Button, Typography } from '@mui/material'

import axios from 'axios'
import styles from './Dropzone.module.scss'

const Dropzone = () => {
	const [IN_ZONE, setInZone] = useState(false)
	const [FILES, setFiles] = useState(false)
	const DROP_CLASS = [styles.dropzone]

	const [selectedFile, setSelectedFile] = useState(null)

	if (IN_ZONE) {
		DROP_CLASS.push(styles.on)
	}

	const convertToBase64 = file => {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader()
			fileReader.readAsDataURL(file)
			fileReader.onload = () => {
				resolve(fileReader.result)
			}
			fileReader.onerror = error => {
				reject(error)
			}
		})
	}

	const handleDrag = function (e) {
		e.preventDefault()
		e.stopPropagation()
		if (e.type === 'dragenter' || e.type === 'dragover') {
			setInZone(true)
		} else if (e.type === 'dragleave') {
			setInZone(false)
		}
	}

	const handleDrop = e => {
		e.preventDefault()
		e.stopPropagation()
		setInZone(false)
		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			setFiles([...e.dataTransfer.files])
		}
	}

	const uploadFiles = async () => {
		let promises = FILES.map(async item => {
			let image = await convertToBase64(item)
			return image
		})

		let images = await Promise.all(promises)
		console.log(images)

		// Upload the files as a POST request to the server using fetch
		// Note: /api/fileupload is not a real endpoint, it is just an example
		try {
			const response = await axios({
				method: 'post',
				url: 'https://cdn.nahana.net/fileupload',
				data: images,
			})

			console.log(response)
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<div>
			<form>
				<div
					className={DROP_CLASS.join(' ')}
					handleDrag={e => handleDrag(e)}
					onDragOver={e => handleDrag(e)}
					onDragLeave={e => handleDrag(e)}
					onDrop={e => handleDrop(e)}
				>
					<input type="file" id="input-file-upload" multiple={true} />
					<Typography variant="h6">Drop Files Here</Typography>
				</div>
			</form>
			{FILES &&
				FILES.map(item => (
					<Typography key={item.name} variant="body2">
						{item.name}
					</Typography>
				))}
			<Button onClick={uploadFiles}>Submit</Button>
		</div>
	)
}

export default Dropzone

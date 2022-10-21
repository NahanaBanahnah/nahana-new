import { useRef, useEffect } from 'react'

export const useFirstRender = () => {
	const FIRST_RENDER = useRef(true)

	useEffect(() => {
		FIRST_RENDER.current = false
	}, [])

	return FIRST_RENDER.current
}

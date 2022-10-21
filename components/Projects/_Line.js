import { useRef, useEffect, useState } from 'react'
import anime from 'animejs'
import useMouse from '@react-hook/mouse-position'

const Line = () => {
	const [STATE, setState] = useState(false)
	const SVG = useRef(null)
	const LINE = useRef({})
	const SPACE = 64

	const MOUSE = useMouse(SVG, {
		enterDelay: 100,
		leaveDelay: 100,
		fps: 30,
	})

	const handleMouseOver = () => setState(true)
	const handleMouseOut = () => setState(false)

	const inRange = (x, min, max) => (x - min) * (x - max) <= 0

	const PLACEMENT = Array.from(new Array(5)).map((_, i) => {
		return {
			index: i,
			start: SPACE * i,
			end: SPACE + (32 + SPACE * i),
		}
	})

	if (STATE) {
		console.log(LINE)
		let current = PLACEMENT.find(e => inRange(MOUSE.y, e.start, e.end))
		for (let i = 0; i < 5; i++) {
			let yOver = PLACEMENT[i].start + 32
			// let diff = current.index - i
			// let start = PLACEMENT[i].start + 32
			// let point = start
			// if (diff < 0) {
			// 	let distance = Math.abs(current.start - MOUSE.y)
			// 	point = start + Math.abs(distance * diff)
			// 	console.log(i, diff)
			// } else {
			// 	let distance = Math.abs(current.start - MOUSE.y)
			// 	point = start - Math.abs(distance * (diff + 1))
			// }
			// let point = (distance * diff) / 4
			anime({
				targets: `.path_${i}`,
				d: [
					{ value: LINE.current[i].getAttribute('d') },
					{
						value: `M0,${yOver} 
                ${MOUSE.x - 50}, ${yOver} 
                C${MOUSE.x - 50}, ${yOver + 50}
                ${MOUSE.x + 50}, ${yOver + 50}
                ${MOUSE.x + 50}, ${yOver}
                L1536,${yOver}`,
					},
				],
				duration: 200,
				easing: 'easeInOutBounce',
			})
		}
	}

	// if (!STATE) {
	// 	PLACEMENT.map((v, i) => {
	// 		let y = v.start + 32

	// 		anime({
	// 			targets: `.path_${i}`,
	// 			d: `M0,${y} Q0,${y} 1536,${y}`,
	// 			duration: 100,
	// 			easing: 'easeOutInBounce',
	// 		})
	// 	})
	// }

	useEffect(() => {
		const NODE = SVG.current

		if (NODE) {
			NODE.addEventListener('mouseover', handleMouseOver)
			NODE.addEventListener('mouseout', handleMouseOut)

			return () => {
				NODE.removeEventListener('mouseover', handleMouseOver)
				NODE.removeEventListener('mouseout', handleMouseOut)
			}
		}
	}, [SVG.current])

	return (
		<svg
			ref={SVG}
			width="1536"
			height="320"
			viewBox="0 0 1536 320"
			xmlns="http://www.w3.org/2000/svg"
		>
			{PLACEMENT.map((v, i) => {
				let y = v.start + 32

				return (
					<>
						<path
							ref={ref => (LINE.current[i] = ref)}
							d={`M0,${y} 100, ${y} 
                            C100, ${y + 50}
                            200, ${y + 50}
                            200, ${y}
                            L1536,${y}`}
							stroke="white"
							stroke-opacity="0.5"
							fill="transparent"
							className={`path_${i}`}
						/>
					</>
				)
			})}
		</svg>
	)
}

export default Line

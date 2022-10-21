import anime from 'animejs'

import styles from '../components/Nav/nav.module.scss'

const FAB_MOVE = 8
const FAB_ROTATE = 45
const FAB_MOVE_DUR = 150
const FAB_MOVE_EASE = 'easeInCirc'

export const fabOn = () => {
	return anime
		.timeline()
		.add(
			{
				targets: '.top',
				top: [
					{
						value: `${FAB_MOVE}px`,
						duration: FAB_MOVE_DUR,
						easing: FAB_MOVE_EASE,
					},
				],
				rotate: [
					{
						value: FAB_ROTATE,
						delay: FAB_MOVE_DUR,
					},
				],
			},
			0
		)
		.add(
			{
				targets: '.middle',
				opacity: 0,
				duration: FAB_MOVE_DUR,
			},
			0
		)
		.add(
			{
				targets: '.bottom',
				top: [
					{
						value: `-${FAB_MOVE}px`,
						duration: FAB_MOVE_DUR,
						easing: FAB_MOVE_EASE,
					},
				],
				rotate: [
					{
						value: -FAB_ROTATE,
						delay: FAB_MOVE_DUR,
					},
				],
			},
			0
		)
}

export const fabOff = () => {
	return anime
		.timeline()
		.add({
			targets: '.top, .bottom',
			top: [
				{
					value: `0px`,
					duration: FAB_MOVE_DUR,
					easing: 'easeOutCirc',
					delay: FAB_MOVE_DUR,
				},
			],
			rotate: [
				{
					value: 0,
				},
			],
		})
		.add(
			{
				targets: '.middle',
				opacity: 1,
				duration: FAB_MOVE_DUR * 4,
			},
			0
		)
}

export const navDrawerIn = async () => {
	return anime
		.timeline()
		.add({
			targets: '.morph',
			d: [
				'M215.7 -67.2C223.3 -63.4 222.4 -90.7 192 0C153.8 0 128.6 0 96 0S31.1 0 0 0C-31.4 -89 -32 -60.9 -24.3 -65C-15.1 -69.8 0 -40.2 33.6 -37.3C61.3 -34.9 67.5 -53.6 99.4 -52.7C128.4 -51.9 132.3 -36.1 156.9 -37.9C190.7 -40.3 206.5 -71.7 215.7 -67.2Z',
				'M215.7 -67.2C223.3 -63.4 222.4 -36.7 192 54C155.8 63.1 128.6 87.7 96 87.7S31.1 54 0 54C-31.4 -35 -32 -60.9 -24.3 -65C-15.1 -69.8 0 -40.2 33.6 -37.3C61.3 -34.9 67.5 -53.6 99.4 -52.7C128.4 -51.9 132.3 -36.1 156.9 -37.9C190.7 -40.3 206.5 -71.7 215.7 -67.2Z',
			],
			easing: 'cubicBezier(.89, .0, .34, 1)',
			duration: 500,
		})
		.add({
			targets: '.linkContainer',
			opacity: [0, 1],
			scale: [2, 1],
			display: 'flex',
			duration: 10,
		})
		.add(
			{
				targets: '.linkContainer > div > h1',
				opacity: [0, 1],
				duration: 300,
				scale: [0, 1],
				easing: 'easeInOutSine',
			},
			'-=100'
		)
		.add(
			{
				targets: '.linkContainer > div > div',
				scaleX: [0, 1],
				opacity: [0, 1],
				easing: 'easeInOutSine',
				duration: 300,
			},
			'-=290'
		)
		.add(
			{
				targets: '.linkContainer > a',
				translateY: ['0px'],
				opacity: [0, 1],
				duration: 350,
				delay: (el, i) => 50 * i,
				easing: 'easeInOutSine',
			},
			'-=100'
		)
}

export const navLinksOutClose = () => {
	return anime.timeline().add(
		{
			targets: '.linkContainer',
			opacity: [1, 0],
			duration: 150,
			easing: 'easeInOutSine',
		},
		0
	).finished
}

export const navLinksOutNavigate = () => {
	return anime.timeline().add(
		{
			targets: '.linkContainer',
			opacity: [1, 0],
			scale: [1, 2],
			duration: 150,
			easing: 'easeInOutSine',
		},
		0
	).finished
}

export const navDrawerOut = () => {
	return anime.timeline().add({
		targets: '.morph',
		d: [
			{
				value: 'M215.7 -67.2C223.3 -63.4 222.4 -90.7 192 0C153.8 0 128.6 0 96 0S31.1 0 0 0C-31.4 -89 -32 -60.9 -24.3 -65C-15.1 -69.8 0 -40.2 33.6 -37.3C61.3 -34.9 67.5 -53.6 99.4 -52.7C128.4 -51.9 132.3 -36.1 156.9 -37.9C190.7 -40.3 206.5 -71.7 215.7 -67.2Z',
				easing: 'cubicBezier(.89, .0, .34, 1)',
				duration: 500,
			},
		],
	}).finished
}

export const navigateWipe = path => {
	const PATH = path === '/' ? 'index' : path.replace('/', '')

	return anime
		.timeline()
		.add(
			{
				targets: '.morph',
				d: 'M215.7 -30.1C223.3 -26.3 222.4 17.4 192 108C154 108 128.6 108 96 108S31.1 108 0 108C-31.4 19 -32 -23.9 -24.3 -27.9C-15.1 -32.7 0 -3.1 33.6 -0.2C61.3 2.2 67.5 -16.5 99.4 -15.6C128.4 -14.8 132.3 1 156.9 -0.8C190.7 -3.2 206.5 -34.7 215.7 -30.1Z',
				easing: 'cubicBezier(.89, .0, .34, 1)',
				duration: 400,
			},
			0
		)
		.add(
			{
				targets: '.morph',
				fill: styles[PATH],
				easing: 'cubicBezier(.89, .0, .34, 1)',
				duration: 500,
			},
			0
		).finished
}

export const wipeOut = () => {
	return anime.timeline().add({
		targets: '.morph',
		d: 'M215.7 94.6C223.3 98.4 222.4 142.1 192 232.7C154 232.7 128.6 232.7 96 232.7S31.1 232.7 0 232.7C-31.4 143.7 -32 100.8 -24.3 96.8C-15.1 92 0 121.6 33.6 124.5C61.3 126.9 67.5 108.2 99.4 109.1C128.4 109.9 132.3 125.7 156.9 123.9C190.7 121.5 206.5 90 215.7 94.6Z',
		easing: 'cubicBezier(.89, .0, .34, 1)',
		duration: 500,
	}).finished
}

export const titleAnimate = () => {
	return anime({
		targets: '.nahana_title_svg__title_animate',
		translateX: [
			{
				value: 400,
				easing: 'easeInOutQuad',
				duration: 20000,
			},
			{
				value: -200,
				easing: 'easeInOutQuad',
				duration: 20000,
			},
		],

		direction: 'alternate',
		loop: true,
	})
}

import Link from 'next/link'

const Nav = () => {
	return (
		<nav>
			<div>
				<Link href="/">Home</Link>
				<Link href="/reel">Reel</Link>
				<Link href="/index">Projects</Link>
				<Link href="/index">About</Link>
			</div>
		</nav>
	)
}

export default Nav

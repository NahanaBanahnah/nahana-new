import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { Button, CircularProgress, Container } from '@mui/material'
import { supabase } from '../util/supabaseClient'

const Login = () => {
	const router = useRouter()
	const [LOADED, setLoaded] = useState(false)

	useEffect(() => {
		const checkSession = async () => {
			const session = await supabase.auth.session()
			if (session) {
				router.push('/admin')
			} else {
				setLoaded(true)
			}
		}

		setTimeout(() => {
			checkSession()
		}, 1000)
	}, [])

	const login = async () => {
		const { user, session, error } = await supabase.auth.signIn(
			{
				provider: 'discord',
			},
			{
				redirectTo: 'admin',
			}
		)
	}

	return (
		<>
			<Head>
				<style>
					{`
                            body {
                                background-color: #282828;
                            }
                       `}
				</style>
			</Head>
			<Container
				maxWidth="xl"
				style={{
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				{LOADED ? (
					<Button style={{ alignSelf: 'center' }} onClick={login}>
						Login With Discord
					</Button>
				) : (
					<CircularProgress style={{ alignSelf: 'center' }} />
				)}
			</Container>
		</>
	)
}

export default Login

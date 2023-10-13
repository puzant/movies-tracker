import React from 'react'
import { useNavigate } from 'react-router-dom'

import useStore from '@/store'
import { getRequestToken, login, createSession } from '@/api'
import { useCustomMutation } from '@/mutations'
import { useCustomQuery } from '@/queries'

import { CircularProgress } from '@mui/material'

export const Login = () => {
  const navigate = useNavigate()
  const setAuthenticated = useStore(state => state.setAuthenticated)

  const [username, setUsername] = React.useState<string>("")
  const [password, setPassword] = React.useState<string>("")

  const { data: requestToken } = useCustomQuery(getRequestToken, 'requestQuery')

  const { mutateAsync: loginMutation, isLoading: loginLoading, error } = useCustomMutation(login, 'login')
  const { mutateAsync: createSessionMutation } = useCustomMutation(createSession, 'userSession')

  const handleLogin = async () => {
    try {
      const loginResponse = await loginMutation({
        username: username,
        password: password,
        requestToken:
          requestToken.data.request_token
      })

      if (!loginResponse.data.success) return

      const createSessionResponse = await createSessionMutation({ requestToken: loginResponse.data.request_token })
      localStorage.setItem('sessionId', createSessionResponse.data.session_id)
      setAuthenticated()
      navigate('/')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className='px-12 mt-10 w-full md:w-[90%] lg:w-[70%] m-auto'>
      <div className="text-2xl">Login to your account</div>
      <div className='mt-1'>This app gets its data from the TMDb APIs. To view your account information, login with your TMDb credentials in the form below. To create one, click here.</div>

      <div className='flex flex-col gap-4 mt-4'>
        <div>
          <span>Username</span>
          <input
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            className='border border-gray-400 w-full p-2 rounded-md focus:outline-none'
          />
        </div>

        <div>
          <span>Password</span>
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            className='border border-gray-400 w-full p-2 rounded-md focus:outline-none'
          />
        </div>
      </div>

      <div className="text-red-500 mt-2">{error && error.response.data.status_message}</div>

      <div onClick={handleLogin} className='rounded-md px-4 py-2 mt-4 bg-blue-400 text-white w-fit'>
        {loginLoading ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : 'Login'}
      </div>
    </div>
  )
}
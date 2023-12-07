import axios from './axiosInstance'
import { IPostLoginBody } from '@/interfaces'

export const login = ({ username, password, requestToken }: IPostLoginBody) => {
  return axios.post('authentication/token/validate_with_login', {
    username,
    password,
    request_token: requestToken
  })
}

export const createSession = ({ requestToken }: { requestToken: string }) =>
  axios.post('/authentication/session/new', { request_token: requestToken });

  export const deleteSession = (sessionId: string) => {
    return axios.delete('/authentication/session', { data: { session_id: sessionId } });
  }

  export const getRequestToken = () => axios.get('/authentication/token/new')
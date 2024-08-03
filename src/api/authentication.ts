import axios from './axiosInstance'
import { IPostLoginBody } from '@/interfaces'

/**
 * Authenticates the user with the given credentials and request token.
 *
 * @param {Object} loginData 
 * @param {string} loginData.username 
 * @param {string} loginData.password 
 * @param {string} loginData.requestToken 
 * @returns {Promise<AxiosResponse>} 
 */
export const login = ({ username, password, requestToken }: IPostLoginBody) => {
  return axios.post('authentication/token/validate_with_login', {
    username,
    password,
    request_token: requestToken
  })
}

/**
 * 
 * @param {Object} sessionObject
 * @param {string} requestToken
 * @returns {Promise<AxiosResponse>}
 */
export const createSession = ({ requestToken }: { requestToken: string }) =>
  axios.post('/authentication/session/new', { request_token: requestToken });

/**
 * 
 * @param sessionId 
 * @returns {Promise<AxiosResponse>}
 */
export const deleteSession = (sessionId: string) => 
  axios.delete('/authentication/session', { data: { session_id: sessionId } });

export const getRequestToken = () => axios.get('/authentication/token/new')
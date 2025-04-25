import axios from "./axiosInstance";
import { IPostLoginBody } from "@/interfaces";

interface ILoginResponse {
  success: boolean;
  expires_at: string;
  request_token: string;
}

interface ISessionResponse {
  success: boolean;
  session_id: string;
}

/**
 * Authenticates the user with the given credentials and request token.
 *
 * @param {Object} loginData
 * @param {string} loginData.username
 * @param {string} loginData.password
 * @param {string} loginData.requestToken
 * @returns {Promise<ILoginResponse>}
 */
export const login = ({ username, password, requestToken }: IPostLoginBody): Promise<ILoginResponse> => {
  return axios.post("authentication/token/validate_with_login", {
    username,
    password,
    request_token: requestToken,
  });
};

/**
 *
 * @param {Object} sessionObject
 * @param {string} requestToken
 * @returns {Promise<ISessionResponse>}
 */
export const createSession = ({ requestToken }: { requestToken: string }): Promise<ISessionResponse> =>
  axios.post("/authentication/session/new", { request_token: requestToken });

/**
 *
 * @param sessionId
 * @returns {Promise<ILoginResponse>}
 */
export const deleteSession = (sessionId: string) =>
  axios.delete("/authentication/session", { data: { session_id: sessionId } });

export const getRequestToken = (): Promise<ILoginResponse> => axios.get("/authentication/token/new");

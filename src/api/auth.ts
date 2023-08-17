import { request } from "../helpers/request"

const URL = {
  REGISTER: "/auth/register",
  LOGIN: "auth/login",
  LOGOUT: "auth/logout",
  GET_LOGIN_STATE: "/auth",
}

export default {
  register({ username, password }: { username: string; password: string }) {
    return request({
      url: URL.REGISTER,
      method: "POST",
      params: { username, password },
    })
  },
  login({ username, password }: { username: string; password: string }) {
    return request({
      url: URL.LOGIN,
      method: "POST",
      params: { username, password },
    })
  },
  logout() {
    return request({
      url: URL.LOGOUT,
      method: "POST",
    })
  },
  get_login_state() {
    return request({
      url: URL.GET_LOGIN_STATE,
    })
  },
}

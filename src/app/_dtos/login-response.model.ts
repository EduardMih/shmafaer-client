export interface LoginResponse {
  jwtToken: string,
  refreshToken: string,
  firstname: string,
  lastname: string,
  email: string,
  roles: string[]
}

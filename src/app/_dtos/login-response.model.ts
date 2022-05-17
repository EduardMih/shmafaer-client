export interface LoginResponse {
  jwtToken: string,
  firstname: string,
  lastname: string,
  email: string,
  roles: string[]
}

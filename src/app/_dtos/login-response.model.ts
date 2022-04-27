export interface LoginResponse {
  jwtToken: string,
  firstname: string,
  lastname: string,
  roles: string[]
}

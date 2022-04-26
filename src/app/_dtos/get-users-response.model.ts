import {UserDetails} from "./user-details.model";

export interface GetUsersResponse {
  nrOfUsers: number,
  users: UserDetails[]
}

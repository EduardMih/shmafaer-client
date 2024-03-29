import {MinimalistUserDetailsResponse} from "./minimalist-user-details-response.model";

export interface GetProjectData {
  id: number,
  title: string,
  repoLink: string,
  description: string,
  projectType: string,
  status: string,

  owner: MinimalistUserDetailsResponse,

  coordinator: MinimalistUserDetailsResponse,

  collaborators: MinimalistUserDetailsResponse[]

}

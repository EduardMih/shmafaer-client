import {AddProjectData} from "./add-project-data";
import {GetProjectData} from "./get-project-data.model";

export interface GetProjectsResponse {
  nrOfProjects: number,
  projects: GetProjectData[]
}

export interface AddProjectData {
  title: string,
  repoLink: string,
  description: string,
  projectType: string,
  ownerEmail: string,
  coordinatorEmail: string | undefined,
  collaboratorsEmail: string[]
}

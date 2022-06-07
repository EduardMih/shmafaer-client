export interface Recommendation {
  name: string,
  htmlUrl: string,
  description: string,
  stargazersCount: number,
  language: string,
  shBrowseUrl: string,
  topics: string[] | null,
  recommendedFor: string
}

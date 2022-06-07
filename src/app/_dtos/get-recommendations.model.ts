import {Recommendation} from "./recommendation.model";

export interface GetRecommendations {
  nrOfRecommendations: number,
  recommendations: Recommendation[]
}

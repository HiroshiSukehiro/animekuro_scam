import { Field, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';
import {
    CreateRecommendationResultsType,
    UpdateRecommendationResultsType,
    GetRecommendationResultsType,
    DeleteRecommendationResultsType,
    GetAnimeByRecommendationResultsType,
} from '../models/results';
@ObjectType()
export class RecommendationMutationType {
    @Field(() => CreateRecommendationResultsType, {
        description: 'Create recommendation',
    })
    createRecommendation: CreateRecommendationResultsType;

    @Field(() => UpdateRecommendationResultsType, {
        description: 'Update recommendation',
    })
    updateRecommendation: UpdateRecommendationResultsType;

    @Field(() => DeleteRecommendationResultsType, {
        description: 'Delete recommendation',
    })
    deleteRecommendation: DeleteRecommendationResultsType;
}

@ObjectType()
export class RecommendationQueryType {
    @Field(() => GetRecommendationResultsType, {
        description: 'Get recommendations',
    })
    getRecommendation: GetRecommendationResultsType;

    // @Field(() => GetAnimeByRecommendationResultsType, {
    //     description: 'Get animes by recommendations',
    // })
    // getAnimeByRecommendation: GetAnimeByRecommendationResultsType;
}

@Resolver()
export class RecommendationRootResolver {
    @Mutation(() => RecommendationMutationType, {
        description: 'Recommendation mutations',
    })
    RecommendationMutations() {
        return {};
    }

    @Query(() => RecommendationQueryType, {
        description: 'Recommendation queries',
    })
    RecommendationQueries() {
        return {};
    }
}

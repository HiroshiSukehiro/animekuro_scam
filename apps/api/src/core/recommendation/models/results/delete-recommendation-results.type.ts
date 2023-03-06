import { Field, Int, ObjectType } from '@nestjs/graphql';

import { BaseResultsType } from '@app/common/models/results';

import { Recommendation } from '../recommendation.model';


@ObjectType()
export class DeleteRecommendationResultsType extends BaseResultsType {
    @Field(() => [Recommendation], {
        nullable: true,
        description: 'Recommendations Anime',
    })
    recommendation: Recommendation[] | null;
    // @Field(() => Int, {
    //     nullable: true,
    //     description: 'Recommendations Anime',
    // })
    // recommendation: number | null;
}

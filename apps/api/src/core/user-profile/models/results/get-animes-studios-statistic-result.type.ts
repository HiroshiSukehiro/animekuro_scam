import { Field, ObjectType } from '@nestjs/graphql';
import {
    BaseResultsType,
    PaginationResultsType,
} from '@app/common/models/results';
import { Anime } from '../../../anime/models/anime.model';
import { Studio } from '../../../studio/models/studio.model';

@ObjectType()
export class GetAnimesStudiosWithStatisticResultsType extends BaseResultsType {
    @Field(() => [StudioStatistic], {
        nullable: true,
        description: 'studios',
    })
    studios: StudioStatistic[];

    @Field(() => PaginationResultsType, {
        nullable: false,
        description: 'Pagination data',
    })
    pagination: PaginationResultsType;
}

@ObjectType()
export class StudioStatistic {
    @Field(() => Studio, {
        description: 'Info by studio',
        nullable: true,
    })
    studio?: any;

    @Field(() => [Anime], {
        description: 'Animes of this studio',
    })
    animes: Anime[];

    @Field(() => Number, {
        description: 'Animes count',
    })
    count: number;

    @Field(() => Number, {
        description: 'percent animes in this studio',
    })
    percent: number;
}

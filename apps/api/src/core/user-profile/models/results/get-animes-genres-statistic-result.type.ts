import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseResultsType, PaginationResultsType } from '@app/common/models/results';
import { Anime } from '../../../anime/models/anime.model';
import { Genre } from '../../../genre/models/genre.model';

@ObjectType()
export class GetAnimesGenresWithStatisticResultsType extends BaseResultsType {
    @Field(() => [GenreStatistic], {
        nullable: true,
        description: 'genres',
    })
    genres: GenreStatistic[];

    @Field(() => PaginationResultsType, {
        nullable: false,
        description: 'Pagination data',
    })
    pagination: PaginationResultsType;
}

@ObjectType()
export class GenreStatistic {
    @Field(() => Genre, {
        description: 'Info by genre',
    })
    genre: Genre;

    @Field(() => [Anime], {
        description: 'Animes of this genre',
    })
    animes: Anime[];

    @Field(() => Number, {
        description: 'Animes count',
    })
    count: number;

    @Field(() => Number, {
        description: 'percent animes in this genre',
    })
    percent: number;
}

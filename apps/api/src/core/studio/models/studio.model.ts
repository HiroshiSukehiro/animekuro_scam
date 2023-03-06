import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';

import { File } from '@app/common/models/results/file.model';

import { Anime } from '../../anime/models/anime.model';

@ObjectType()
export class Studio {
    @Field(() => ID, {
        description: 'Unique ID of the studio',
    })
    id?: string;

    @Field(() => Boolean, {
        description: 'Favourite anime',
        defaultValue: false,
    })
    is_favourite?: boolean;

    @Field(() => String, {
        description: 'Name of the studio',
    })
    name: string;

    @Field(() => Float, {
        description: 'Rating of the studio',
    })
    rating: number;

    @Field(() => File, { nullable: true })
    thumbnail?: File;

    @Field(() => [Anime], {
        nullable: true,
        description: 'Animes produced by the studio',
    })
    animes: Anime[];

    @Field(() => Int, {
        description: 'Number of animes produced by the studio',
    })
    anime_count: number;

    @Field(() => Int)
    anime_starts: number;

    @Field(() => Int)
    anime_ends: number;

    @Field(() => Boolean, {
        description:
            'If the studio is an animation studio or a different kind of company',
        defaultValue: true,
    })
    is_animation_studio: boolean;

    @Field(() => Date, { description: 'When the studio data was created' })
    created_at: Date;

    @Field(() => Date, { description: 'When the studio data was last updated' })
    updated_at: Date;
}

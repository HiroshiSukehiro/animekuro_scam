import { Field, ID, ObjectType } from '@nestjs/graphql';

import { FolderType } from '@app/common/models/enums';

import { Anime } from '../../anime/models/anime.model';
import { UserProfile } from '../../user-profile/models/user-profile.model';

@ObjectType()
export class UserFolder {
    @Field(() => ID, {
        description: 'Unique ID of the user-anime',
    })
    id: string;

    @Field(() => UserProfile, {
        nullable: true,
    })
    user_profile?: UserProfile;

    @Field(() => Boolean, {
        description: 'Favourite anime',
        defaultValue: false,
    })
    is_favourite?: boolean;

    @Field(() => ID)
    user_profile_id: string;

    @Field(() => [Anime], {
        description: 'The media in folder',
        nullable: true,
    })
    animes: Anime[];

    @Field(() => String, {
        description: 'Name of folder',
    })
    name: string;

    @Field(() => String, {
        description: 'Description of folder',
    })
    description: string;

    @Field(() => FolderType, {
        defaultValue: FolderType.DEFAULT,
        description: 'Type of folder',
    })
    type: FolderType;

    @Field(() => Date, {
        description: 'Creation date',
    })
    created_at: Date;

    @Field(() => Date, {
        description: 'Updation date',
    })
    updated_at: Date;

    @Field(() => Boolean, { description: 'Active statistic' })
    is_statistic_active: boolean;

    /*@Field(() => Int, {
        description: 'Which episode the user is currently watching',
    })
    episode?: number;

    @Field(() => Int, {
        description: 'Seconds: duration of the episode',                        СТАТИСТИКИ НЕТ!!!!
    })
    episode_duration?: number;

    @Field(() => Int, {
        description: 'Seconds: amount of the watched seconds ',
    })
    watched_duration?: number;*/
}

import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import { CharacterRole, CharacterType } from '@app/common/models/enums';
import { CharacterStatistics } from '@app/common/models/results/character-statistics.model';
import { File } from '@app/common/models/results/file.model';

import { Anime } from '../../anime/models/anime.model';

@ObjectType()
export class Character {
    @Field(() => ID, {
        description: 'Unique ID of the character',
    })
    id: string;

    @Field(() => Boolean, {
        description: 'Favourite anime',
        defaultValue: false,
    })
    is_favourite?: boolean;

    @Field(() => String, {
        description: 'The names of the character',
    })
    name: string;

    @Field(() => String, {
        nullable: true,
        defaultValue: null,
        description: `The character's gender. Usually Male, Female, or Non-binary.`,
    })
    gender: string;

    @Field(() => String, {
        nullable: true,
        defaultValue: null,

        description: `The character's birth date`,
    })
    date_of_birth: string;

    @Field(() => Int, {
        nullable: true,
        description: `The character's age`,
    })
    age: number;

    @Field(() => String, {
        nullable: true,
        defaultValue: null,

        description: `The character's blood type`,
    })
    blood_type: string;

    @Field(() => [String], {
        nullable: true,
        description: 'Alternative names of the character',
    })
    synonyms: string[];

    @Field(() => CharacterType, {
        defaultValue: CharacterType.PROTAGONIST,
        description: 'Type of the character',
    })
    importance: string;

    @Field(() => CharacterRole, {
        defaultValue: CharacterRole.MAIN,
        description: 'Role of the character',
    })
    role: string;

    @Field(() => String, {
        description: 'Brief description of the character',
        nullable: true,
    })
    description: string;

    @Field(() => File, { nullable: true })
    cover?: File;

    @Field(() => [Anime], {
        nullable: true,
        description: 'List of the animes in which the character appears',
    })
    animes: Anime[];

    @Field(() => CharacterStatistics, {
        nullable: true,
        description: 'Character statistics',
    })
    statistics?: CharacterStatistics;
}

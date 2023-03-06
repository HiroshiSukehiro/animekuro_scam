import { IsUUID, Max, Min } from 'class-validator';

import { IsNumber } from '@nestjs/class-validator';
import { ArgsType, Field, Float, ID, Int } from '@nestjs/graphql';

@ArgsType()
export class UpdateRatingAnimeInputType {
    @IsUUID(4)
    @Field(() => ID)
    anime_id: string;

    @Min(1)
    @Max(5)
    @IsNumber()
    @Field(() => Int)
    rating: number;
}

import { Field, ObjectType } from '@nestjs/graphql';

import { BaseResultsType, PaginationResultsType } from '@app/common/models/results';

import { AiringSchedule } from '../airing-schedule.model';

@ObjectType()
export class GetListAiringScheduleResultsType extends BaseResultsType {
    @Field(() => [AiringSchedule], {
        nullable: true,
        description: 'AiringSchedule',
    })
    airing_schedule: AiringSchedule[];

    @Field(() => PaginationResultsType, {
        nullable: false,
        description: 'Pagination data',
    })
    pagination: PaginationResultsType;
}

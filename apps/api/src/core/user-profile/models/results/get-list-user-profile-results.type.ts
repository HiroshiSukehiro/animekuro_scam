import { Field, ObjectType } from '@nestjs/graphql';

import {
    BaseResultsType,
    PaginationResultsType,
} from '@app/common/models/results';

import { UserProfile } from '../user-profile.model';

@ObjectType()
export class GetListUserProfileResultsType extends BaseResultsType {
    @Field(() => [UserProfile], {
        nullable: true,
        description: 'User Profile list',
    })
    userProfileList: UserProfile[];

    @Field(() => PaginationResultsType, {
        nullable: false,
        description: 'Pagination data',
    })
    pagination: PaginationResultsType;
}

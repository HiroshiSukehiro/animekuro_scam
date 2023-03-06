import { Args, ResolveField, Resolver } from '@nestjs/graphql';

import { AccessToken } from '@app/common/decorators';
import { AuthMiddleware } from '@app/common/middlewares/auth.middleware';
import { PaginationInputType } from '@app/common/models/inputs';

import {
    GetAnimesGenresWithStatisticResultsType,
    GetAnimesStudiosWithStatisticResultsType,
    GetListUserProfileResultsType,
    GetUserProfileResultsType,
} from '../models/results';
import {
    GetUserProfileInputType,
    GetGenresAndStudiosWithStatisticInputType,
} from '../models/inputs';
import { UserProfileService } from '../services/user-profile.service';

import {
    UserProfileQueryType,
    UserProfileRootResolver,
} from './user-profile-root.resolver';
import { GetHistoryAnimeResultsType } from '../models/results/get-history-anime-results.type';
import { GetHistoryBaseInputType } from '../models/inputs/get-history-base-input.type';
import { GetHistoryAuthorResultsType } from '../models/results/get-history-author-results.type';
import { GetHistoryCharacterResultsType } from '../models/results/get-history-character-results.type';

@Resolver(UserProfileQueryType)
export class UserProfileQueryResolver extends UserProfileRootResolver {
    constructor(private userProfileService: UserProfileService) {
        super();
    }

    @ResolveField(() => GetUserProfileResultsType, {
        middleware: [AuthMiddleware],
    })
    async getUserProfile(
        @Args() args: GetUserProfileInputType,
        @AccessToken() user_id: string,
    ): Promise<GetUserProfileResultsType> {
        return await this.userProfileService.getUserProfile({
            user_id,
            ...args,
        });
    }

    @ResolveField(() => GetListUserProfileResultsType, {
        middleware: [AuthMiddleware],
    })
    async getUserProfileList(
        @Args() args: PaginationInputType,
    ): Promise<GetListUserProfileResultsType> {
        return await this.userProfileService.getUserProfileList(args);
    }

    @ResolveField(() => GetHistoryAnimeResultsType, {
        middleware: [AuthMiddleware]
    })
    async getHistoryAnime(
        @Args() args: GetHistoryBaseInputType,
        @Args() pagination: PaginationInputType,
        @AccessToken() user_id: string
    ): Promise<GetHistoryAnimeResultsType> {
        return await this.userProfileService.getHistoryAnime(args, pagination)
    }

    @ResolveField(() => GetHistoryAuthorResultsType, {
        middleware: [AuthMiddleware]
    })
    async getHistoryAuthor(
        @Args() args: GetHistoryBaseInputType,
        @Args() pagination: PaginationInputType,
        @AccessToken() user_id: string
    ): Promise<GetHistoryAuthorResultsType> {
        return await this.userProfileService.getHistoryAuthor(args, pagination)
    }

    @ResolveField(() => GetHistoryCharacterResultsType, {
        middleware: [AuthMiddleware]
    })
    async getHistoryCharacter(
        @Args() args: GetHistoryBaseInputType,
        @Args() pagination: PaginationInputType,
        @AccessToken() user_id: string
    ): Promise<GetHistoryCharacterResultsType> {
        return await this.userProfileService.getHistoryCharacter(args, pagination)
    }

    @ResolveField(() => GetAnimesGenresWithStatisticResultsType, {
        middleware: [AuthMiddleware],
    })
    async getFavouriteGenresWithStatistic(
        @AccessToken() user_id: string,
        @Args() pagination: PaginationInputType,
        @Args() sort: GetGenresAndStudiosWithStatisticInputType,
    ): Promise<GetAnimesGenresWithStatisticResultsType> {
        return await this.userProfileService.getGenresLikeFolders(
            user_id,
            sort.sort_order,
            sort.sort_field,
            sort.only_favourite,
            pagination,
        );
    }

    @ResolveField(() => GetAnimesStudiosWithStatisticResultsType, {
        middleware: [AuthMiddleware],
    })
    async getFavouriteStudiosWithStatistic(
        @AccessToken() user_id: string,
        @Args() pagination: PaginationInputType,
        @Args() sort: GetGenresAndStudiosWithStatisticInputType,
    ): Promise<GetAnimesStudiosWithStatisticResultsType> {
        return await this.userProfileService.getStudiosLikeFolders(
            user_id,
            sort.sort_order,
            sort.sort_field,
            sort.only_favourite,
            pagination,
        );
    }
}

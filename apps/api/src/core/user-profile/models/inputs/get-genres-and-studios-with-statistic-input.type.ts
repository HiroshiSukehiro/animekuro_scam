import { IsOptional } from '@nestjs/class-validator';
import { ArgsType, Field } from '@nestjs/graphql';
import { SortOrder } from '@app/common/models/enums/sort-order.enum';
import { Sort } from '../sort.enum';

@ArgsType()
export class GetGenresAndStudiosWithStatisticInputType {
    @IsOptional()
    @Field(() => SortOrder, {
        defaultValue: SortOrder.DESC,
        description: 'Order by ASC/DESC',
    })
    sort_order: SortOrder;

    @IsOptional()
    @Field(() => Sort, {
        defaultValue: Sort.NAME,
        description: 'Sort by field',
    })
    sort_field: Sort;

    @IsOptional()
    @Field(() => Boolean, {
        defaultValue: false,
        description: 'Only favourite genres',
    })
    only_favourite: boolean;
}

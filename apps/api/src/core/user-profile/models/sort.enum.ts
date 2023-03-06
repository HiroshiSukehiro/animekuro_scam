import { registerEnumType } from '@nestjs/graphql';

export enum Sort {
    NAME = 'name',
    COUNT = 'count',
    COUNT_IN = 'countIn',
    PERCENT = 'percent',
}

registerEnumType(Sort, {
    name: 'Sort',
});

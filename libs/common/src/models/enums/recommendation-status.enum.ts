import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';
import { RecommendationStatus } from '@prisma/client';
export { RecommendationStatus } from '@prisma/client';

registerEnumType(RecommendationStatus, {
    name: 'RecommendationStatus',
});

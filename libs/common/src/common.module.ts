import { Global, Module } from '@nestjs/common';

import { SchemaService } from './services/schema.service';
import { PaginationService } from './services/pagination.service';
import { PasswordService } from './services/password.service';
import { PrismaService } from './services/prisma.service';
import { FileUploadService } from './services/file-upload.service';
import { StatisticService } from './services/statistic.service';
import {
    AccountLimitConstraint,
    ComparePasswordConstraint,
    EntityExistsConstraint,
    UniqueConstraint,
} from './decorators';
import { MarkdownService } from './services/markdown.service';

@Global()
@Module({
    providers: [
        PaginationService,
        PasswordService,
        PrismaService,
        SchemaService,
        FileUploadService,
        StatisticService,
        EntityExistsConstraint,
        ComparePasswordConstraint,
        AccountLimitConstraint,
        UniqueConstraint,
        MarkdownService,
    ],
    exports: [
        PaginationService,
        PasswordService,
        PrismaService,
        SchemaService,
        FileUploadService,
        StatisticService,
        EntityExistsConstraint,
        ComparePasswordConstraint,
        AccountLimitConstraint,
        UniqueConstraint,
        MarkdownService,
    ],
})
export class CommonModule {}

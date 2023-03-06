import { ConfigService } from '@nestjs/config';
import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from '../services/prisma.service';
import { ErrorType } from '../models/enums/error.enum';

const configService = new ConfigService();
export const AuthMiddleware: FieldMiddleware = async (
    ctx: MiddlewareContext,
    next: NextFn,
) => {
    if (!ctx.context.req.user_id) {
        const auth = ctx.context.req.headers.authentication;
        const prismaService = new PrismaService();
        const jwtService = new JwtService();
        if (!!auth) {
            try {
                await jwtService.verify(auth, {
                    secret: configService.get<string>('ACCESS_TOKEN_SECRET'),
                });
            } catch (err: any) {
                if (err.name === 'TokenExpiredError') {
                    ctx.context.req.error = ErrorType.TOKEN_EXPIRED;
                }
            }
            const token: any = jwtService.decode(auth);
            if (!!token && !ctx.context.req.user) {
                const user = await prismaService.user.findUnique({
                    where: { id: token.uuid },
                    select: {
                        id: true,
                        is_email_confirmed: true,
                        user_profile: {
                            select: {
                                id: true,
                            },
                        },
                    },
                });
                if (!!user && !user?.is_email_confirmed) {
                    ctx.context.req.error = ErrorType.UNAUTHORIZED_BY_EMAIL;
                    ctx.context.req.user_id = user?.id;
                    ctx.context.req.profile_id = user?.user_profile?.id;
                } else if (!!user) {
                    ctx.context.req.user_id = user.id;
                    ctx.context.req.profile_id = user.user_profile?.id;
                } else {
                    ctx.context.req.error = ErrorType.TOKEN_NOT_FOUND;
                }
            } else {
                ctx.context.req.error = ErrorType.TOKEN_ERROR;
            }
        } else {
            ctx.context.req.error = ErrorType.TOKEN_ERROR;
        }
    }
    return await next();
};

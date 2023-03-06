import fs from 'fs';
import path from 'path';
import * as handlebars from 'handlebars';
import * as nodemailer from 'nodemailer';
import type { SendMailOptions } from 'nodemailer';
import SMTPTransport, { Options } from 'nodemailer/lib/smtp-pool';

import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { MailPurpose } from '@app/common/models/enums';

@Injectable()
export class Mailer implements OnModuleInit {
    private nodemailer: nodemailer.Transporter;

    constructor(private configService: ConfigService) {}

    onModuleInit(): void {
        const port = this.configService.get<number>('MAILER_PORT', 587);
        this.nodemailer = nodemailer.createTransport(
            <SMTPTransport.Options>{
                pool: true,
                host: this.configService.get<string>(
                    'MAILER_HOST',
                    'smtp.mail.ru',
                ),
                port,
                secure: false,
                auth: {
                    user: this.configService.get<string>(
                        'MAILER_EMAIL',
                        'some@mail.ru',
                    ),
                    pass: this.configService.get<string>(
                        'MAILER_PASSWORD',
                        'password',
                    ),
                },
                tls: {
                    rejectUnauthorized: false,
                },
                from: {
                    name: this.configService.get<string>(
                        'MAILER_SENDER_NAME',
                        'somename',
                    ),
                    address: this.configService.get<string>(
                        'MAILER_EMAIL',
                        'somename@mail.ru',
                    ),
                },
            },
            <SMTPTransport.Options>{
                from: {
                    name: this.configService.get<string>(
                        'MAILER_SENDER_NAME',
                        'somename',
                    ),
                    address: this.configService.get<string>(
                        'MAILER_EMAIL',
                        'somename@mail.ru',
                    ),
                },
            },
        );
    }

    public async sendMail(
        options: SendMailOptions,
        purpose: MailPurpose,
        variables?: ReadonlyMap<string, string> | {},
    ): Promise<void> {
        console.log('public async sendMail');
        console.log('to sendMail', options.to);
        console.log('options sendMail', options);
        const rtestmail = await this.nodemailer.sendMail(
            {
                to: options.to,
                subject: options.subject,
                html: this.getMailTemplate(purpose, variables),
            },
            (err, info) => {
                console.log('info', info);
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Successfully sent email to ${options.to}`);
                }
            },
        );
        console.log('rtestmail', rtestmail);
        return rtestmail;
    }

    private getMailTemplate(
        purpose: MailPurpose,
        variables?: ReadonlyMap<string, string> | {},
    ): string {
        const template = handlebars.compile(
            fs.readFileSync(
                path.join(__dirname, __dirname.includes('mailer') ? '' : 'mailer/', `templates/${purpose}.handlebars`),
                'utf8',
            ),
        );
        return template(variables);
    }
}

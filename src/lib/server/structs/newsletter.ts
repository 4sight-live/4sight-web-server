import { text } from "drizzle-orm/pg-core";
import { Struct } from "drizzle-struct/back-end";

export namespace Newsletter {
    export const MailingList = new Struct({
        name: 'mailing_list',
        structure: {
            firstName: text('first_name').notNull(),
            lastName: text('last_name').notNull(),
            email: text('email').notNull(),
        }
    });

    export type MailingListData = typeof MailingList.sample;

    export const TeamOnboarding = new Struct({
        name: 'team_onboarding',
        structure: {
            firstName: text('first_name').notNull(),
            lastName: text('last_name').notNull(),
            email: text('email').notNull(),
            experience: text('experience').notNull(),
        }
    });

    export type TeamOnboardingData = typeof TeamOnboarding.sample;
}
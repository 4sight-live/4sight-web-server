import { pgEnum, text } from 'drizzle-orm/pg-core';
import { Struct } from 'drizzle-struct/back-end';
import { Email } from './email';
import terminal from '../utils/terminal';

export namespace Newsletter {
	export const MailingList = new Struct({
		name: 'mailing_list',
		structure: {
			firstName: text('first_name').notNull(),
			lastName: text('last_name').notNull(),
			email: text('email').notNull()
		},
		frontend: false
	});

	export type MailingListData = typeof MailingList.sample;

	MailingList.on('create', async (target) => {
		const unsub = await Email.createLink(
			`https://4sight.live/newsletter/${target.data.id}/unsubscribe`
		);

		if (unsub.isErr()) {
			terminal.error(
				`Failed to create unsubscribe link for mailing list ${target.data.email}: ${unsub.error}`
			);
			return;
		}
		Email.send({
			to: target.data.email,
			subject: 'Welcome to the 4sight Newsletter',
			type: 'welcome-mailing-list',
			data: {
				logo: 'https://4sight.live/images/logo.png',
				visit: 'https://4sight.live',
				unsubscribe: unsub.value,
				name: `${target.data.firstName} ${target.data.lastName}`.trim() || 'there'
			}
		});
	});

	export const TeamOnboarding = new Struct({
		name: 'team_onboarding',
		structure: {
			firstName: text('first_name').notNull(),
			lastName: text('last_name').notNull(),
			email: text('email').notNull(),
			experience: text('experience').notNull(),
			interest: text('interest').notNull()
		},
		frontend: false
	});

	export type TeamOnboardingData = typeof TeamOnboarding.sample;

	TeamOnboarding.on('create', async (target) => {
		const unsub = await Email.createLink(
			`https://4sight.live/onboarding/${target.data.id}/unsubscribe`
		);

		if (unsub.isErr()) {
			terminal.error(
				`Failed to create unsubscribe link for team onboarding ${target.data.email}: ${unsub.error}`
			);
			return;
		}

		Email.send({
			to: target.data.email,
			subject: 'Welcome to the 4sight Team Onboarding',
			type: 'welcome-onboarding',
			data: {
				logo: 'https://4sight.live/images/logo.png',
				site: 'https://4sight.live',
				unsubscribe: unsub.value,
				contributorGuide: ''
			}
		});
	});
}

export const _mailingList = Newsletter.MailingList.table;
export const _teamOnboarding = Newsletter.TeamOnboarding.table;

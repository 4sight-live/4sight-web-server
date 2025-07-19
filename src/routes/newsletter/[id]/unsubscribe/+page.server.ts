import { Newsletter } from '$lib/server/structs/newsletter';

export const load = async (event) => {
	const mailer = await Newsletter.MailingList.fromId(event.params.id).unwrap();
	if (!mailer) {
		return {
			message: 'You were not subscribed to this mailing list.'
		};
	}

	await mailer.delete().unwrap();

	return {
		message: 'You have been unsubscribed from the mailing list.'
	};
};

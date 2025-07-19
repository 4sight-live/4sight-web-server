import { Newsletter } from '$lib/server/structs/newsletter.js';
import terminal from '$lib/server/utils/terminal.js';
import { json } from '@sveltejs/kit';
import { z } from 'zod';

export const POST = async (event) => {
	const parsed = z
		.object({
			email: z.string().email(),
			firstName: z.string().min(1),
			lastName: z.string().min(1)
		})
		.safeParse(await event.request.json());

	if (!parsed.success) {
		terminal.error(`Invalid input for newsletter subscription: ${parsed.error}`);
		return json({
			success: false,
			message: 'Invalid input'
		});
	}

	const { email, firstName, lastName } = parsed.data;

	await Newsletter.MailingList.new({
		email,
		firstName,
		lastName
	}).unwrap();

	return json({
		success: true,
		message: 'Successfully subscribed to the newsletter'
	});
};

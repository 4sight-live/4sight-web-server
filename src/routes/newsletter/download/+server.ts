import { Account } from '$lib/server/structs/account.js';
import { Newsletter } from '$lib/server/structs/newsletter.js';
import { fail } from '@sveltejs/kit';
import { ServerCode } from 'ts-utils/status';

export const GET = async (event) => {
	if (!event.locals.account) {
		throw fail(ServerCode.unauthorized);
	}
	if (!(await Account.isAdmin(event.locals.account).unwrap())) {
		throw fail(ServerCode.forbidden);
	}

	const stream = Newsletter.MailingList.all({ type: 'stream' });
	// stream the mailing list to the client as a csv file to download

	const encoder = new TextEncoder();
	const readableStream = new ReadableStream({
		start(controller) {
			controller.enqueue(encoder.encode('Email,First Name,Last Name\n'));
			stream.on('data', (nl) => {
				const row = `${nl.data.email},${nl.data.firstName || ''},${nl.data.lastName || ''}\n`;
				controller.enqueue(encoder.encode(row));
			});
			stream.on('end', () => {
				controller.close();
			});
			stream.on('error', (err) => {
				console.error('Error streaming mailing list:', err);
				controller.error(err);
			});
		}
	});

	return new Response(readableStream, {
		headers: {
			'Content-Type': 'text/csv',
			'Content-Disposition': 'attachment; filename="mailing_list.csv"'
		}
	});
};

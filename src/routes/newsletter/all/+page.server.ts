import { Account } from '$lib/server/structs/account.js';
import { fail } from '@sveltejs/kit';
import { ServerCode } from 'ts-utils/status';

export const load = async (event) => {
    if (!event.locals.account) {
        throw fail(ServerCode.unauthorized);
    }
    if (!await Account.isAdmin(event.locals.account).unwrap()) {
        throw fail(ServerCode.forbidden);
    }
};
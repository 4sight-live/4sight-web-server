import { text } from "drizzle-orm/pg-core";
import { Struct } from "drizzle-struct/back-end";

export namespace Streams {
    export const StreamKey = new Struct({
        name: 'stream_keys',
        structure: {
            account: text('account').notNull(),
            key: text('key').notNull(),
        }
    });

    export const StreamSettings = new Struct({
        name: 'stream_settings',
        structure: {},
    });
}
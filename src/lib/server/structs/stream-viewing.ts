import { text } from "drizzle-orm/pg-core";
import { Struct } from "drizzle-struct/back-end";

export namespace Viewing {
    export const CurrentViewers = new Struct({
        name: 'current_viewers',
        structure: {
            account: text('account').notNull(),
            target: text('target').notNull(),
        }
    });

    // Once viewing is closed, it will be added to the history.

    export const ViewHistory = new Struct({
        name: 'view_history', 
        structure: {
            account: text('account').notNull(),
            target: text('target').notNull(),
            timestamp: text('timestamp').notNull(),
            duration: text('duration').notNull(), // ms
        }
    });


    export const StreamSettings = new Struct({
        name: 'stream_view_settings',
        structure: {
            account: text('account').notNull(),
            target: text('target').notNull(),
        },
    });
}
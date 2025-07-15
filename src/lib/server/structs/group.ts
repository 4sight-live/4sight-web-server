import { Struct } from "drizzle-struct/back-end";

export namespace Group {
    export const Group = new Struct({
        name: 'groups',
        structure: {}
    });
}
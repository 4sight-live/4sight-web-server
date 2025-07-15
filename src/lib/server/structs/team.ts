import { Struct } from "drizzle-struct/back-end";

export namespace Team {
    export const Team = new Struct({
        name: 'teams',
        structure: {},
    });
}
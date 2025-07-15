import { text } from "drizzle-orm/pg-core";
import { Struct } from "drizzle-struct/back-end";
import { attemptAsync } from "ts-utils/check";
import terminal from "../utils/terminal";

export namespace Organization {
    export const Organization = new Struct({
        name: 'organizations',
        structure: {
            name: text('name').notNull(),
            owner: text('owner').notNull(),
        }
    });

    export type OrganizationData = typeof Organization.sample;

    Organization.on('create', async (org) => {
        // Create admin role for the organization with allowed permissions
        // Grant admin role to the creator of the organization
        const res = await generateRoles(org);

        if (res.isErr()) {
            terminal.error(`Failed to generate roles for organization ${org.data.name}: ${res.error}`);
        }
    });

    Organization.on('delete', async (org) => {});

    export const generateRoles = (org: OrganizationData) => {
        return attemptAsync(async () => {

        });
    };
}
import Database from 'better-sqlite3';
import { Campaign } from '$lib/db.server.js';
import { invalidate } from '$app/navigation';
const db = new Database("db/main.db", {});
db.pragma("journal_mode = WAL");

export function load({ params }) {
    var campaigns = Campaign.getAll().map(x => x.toJSON()).reverse();
	return {
		campaigns: campaigns,
	};
}

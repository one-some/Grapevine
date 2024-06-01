import Database from 'better-sqlite3';
const db = new Database("db/main.db", {});
db.pragma("journal_mode = WAL");

export function load({ params, cookies }) {
    var entries = db.prepare("SELECT name, desc, org_type FROM orgs;").all();
	return {
		entries: entries,
	};
}

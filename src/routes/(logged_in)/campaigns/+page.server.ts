console.log("hi");
import Database from 'better-sqlite3';
const db = new Database("db/main.db", {});
db.pragma("journal_mode = WAL");

export function load({ params }) {
    var campaigns = db.prepare("SELECT title, desc, money_needed, money_donated FROM campaigns WHERE owner_id = 1;").all();
	return {
		campaings: campaigns,
	};
}
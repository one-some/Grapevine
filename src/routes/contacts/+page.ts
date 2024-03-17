console.log("hi");

import Database from 'better-sqlite3';
const db = new Database("db/main.db", {});
db.pragma("journal_mode = WAL");

console.log(db.prepare('SELECT * FROM orgs'));



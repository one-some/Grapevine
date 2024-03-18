import Database from 'better-sqlite3';
const db = new Database("db/main.db", {});
db.pragma("journal_mode = WAL");

export function load( {params}) {
    console.log(params.slug);
    db.prepare("SELECT type, desc, ")
    return{
        org: params.slug
    };
}
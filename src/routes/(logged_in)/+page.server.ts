import Database from 'better-sqlite3';
const db = new Database("db/main.db", {});
db.pragma("journal_mode = WAL");

export function load(  { cookies, url }) {
    const STUPIDHACK = url.pathname;
	/*  HACK: According to https://kit.svelte.dev/docs/load#rerunning-load-functions-when-do-load-functions-rerun
	load functions will not run when changing pages unless something referenced in the function, such as url, changes. Maybe could be replaced with invalidateAll()? 
	It must be url.pathname too, not just url.  */

    let contact = db.prepare("SELECT desc, org_type, employee_count FROM orgs WHERE 1 = 1").all();
    return{
        contact: contact
    };
}

export function demand_money_algorithmn() {

}

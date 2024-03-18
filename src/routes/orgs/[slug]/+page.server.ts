import Database from 'better-sqlite3';
const db = new Database("db/main.db", {});
db.pragma("journal_mode = WAL");

export function load( {params}) {
    console.log(params.slug);
    let contact = db.prepare("SELECT desc, org_type, employee_count FROM orgs WHERE NAME = ?").all(params.slug);
    let peoples_contact_info = db.prepare("SELECT first_name, last_name, email, phone FROM contacts WHERE org_id = (SELECT id FROM orgs WHERE name = ?)").all(params.slug);
    return{
        contact: contact[0],
        people: peoples_contact_info,
        name: params.slug
    };
}

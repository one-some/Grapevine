import Database from 'better-sqlite3';
const db = new Database("db/main.db", {});
db.pragma("journal_mode = WAL");

export function load({ params }) {
    const id = db.prepare("SELECT id FROM campaigns WHERE title = ?").get(params.slug);
    console.log(id.id);
    const campaign = db.prepare("SELECT title, desc, money_needed, money_donated FROM campaigns WHERE id = ?").get(id.id);
    console.log(campaign);
    const donations = {
        name: db.prepare("SELECT name FROM orgs WHERE id = (SELECT org_id FROM donations WHERE campaign_id = ?)").all(id.id),
        amount: db.prepare("SELECT amount_usd FROM donations WHERE campaign_id = ?").all(id.id)
    };
    console.log(donations);
	return {
        campaign: campaign,
        donations: donations
	};
}


/*
{
    name: nasa,             // in orgs, stored in donations as id
    amount: 2000            // in donations
}


*/
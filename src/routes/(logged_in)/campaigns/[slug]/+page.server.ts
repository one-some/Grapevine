import Database from 'better-sqlite3';
import { Donation, Organization, Contact } from '$lib/db.server'
const db = new Database("db/main.db", {});
db.pragma("journal_mode = WAL");

export function load({ params }) {
    const campaignid = params.slug;
    const campaign = db.prepare("SELECT title, desc, money_needed, money_donated FROM campaigns WHERE id = ?").get(campaignid);
    const donationrows = db.prepare("SELECT * FROM donations WHERE campaign_id = ?").all(campaignid)

    var donations : any[]= []

    console.log("DONATION ROWS \n\n\n", donationrows[1])

    // console.log(donationrows)

    for(var x = 0; x < donationrows.length; x++){
        donations.push(new Donation(donationrows[x].id , '', Organization.fromId(donationrows[x].org_id), Number(campaignid), Contact.fromId(donationrows[x].contact_id), donationrows[x].amount_usd, donationrows[x].time ).toJSON())
    }

    console.log("DONATIONS: \n\n\n", donations[1])
    console.log({
        campaign: campaign,
        donations: donations,
	})
	return {
        campaign: campaign,
        donations: donations,
	};
}


/*
{
    name: nasa,             // in orgs, stored in donations as id
    amount: 2000            // in donations
}


*/

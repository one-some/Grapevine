import { Donation, DonationInProgress, Organization, User } from '$lib/db.server';
import Database from 'better-sqlite3';
const db = new Database("db/main.db", {});
db.pragma("journal_mode = WAL");

export function load(  { cookies, url }) {
    const STUPIDHACK = url.pathname;
	/*  HACK: According to https://kit.svelte.dev/docs/load#rerunning-load-functions-when-do-load-functions-rerun
	load functions will not run when changing pages unless something referenced in the function, such as url, changes. Maybe could be replaced with invalidateAll()? 
	It must be url.pathname too, not just url.  */

    const user = User.fromJWT(cookies.get("JWT"));

    let contact = db.prepare("SELECT desc, org_type, employee_count FROM orgs WHERE 1 = 1").all();

    const recentDonations = Donation.recent(25).map(x => x.toJSON()).reverse();
    const ongoingNegotiations = DonationInProgress.recent(10).map(x => x.toJSON()).reverse();
    const organizations = Organization.getAll().map(x => x.toJSON()).reverse();

    for (let org of organizations) {
        let ret = Organization.calcPotentialDonation(org);
        org.potentialDonation = ret.amount;
        org.potentialStatus = ret.status;
    }

    return {
        user: user.toJSON(),
        contact: contact,
        recentDonations: recentDonations,
        ongoingNegotiations: ongoingNegotiations,
        organizations: organizations
    };
}

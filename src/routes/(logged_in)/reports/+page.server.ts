import { Donation, DonationInProgress, Organization, User, Campaign } from '$lib/db.server';

export function load(  { cookies, url }) {
    const _hack = url.pathname;
	/*  HACK: According to https://kit.svelte.dev/docs/load#rerunning-load-functions-when-do-load-functions-rerun
	load functions will not run when changing pages unless something referenced in the function, such as url, changes. Maybe could be replaced with invalidateAll()? 
	It must be url.pathname too, not just url.  */

    const user = User.fromJWT(cookies.get("JWT"));

    const recentDonations = Donation.recent(25).map(x => x.toJSON()).reverse();
    const ongoingNegotiations = DonationInProgress.recent(10).map(x => x.toJSON()).reverse();
    const organizations = Organization.getAll().map(x => x.toJSON()).reverse();
    const campaigns = Campaign.getAll().map(x => x.toJSON()).reverse();

    for (let org of organizations) {
        let ret = Organization.calcPotentialDonation(org);
        org.potentialDonation = ret.amount;
        org.potentialStatus = ret.status;
    }

    return {
        user: user.toJSON(),
        recentDonations: recentDonations,
        ongoingNegotiations: ongoingNegotiations,
        organizations: organizations,
        campaigns: campaigns
    };
}

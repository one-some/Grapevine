import { DonationInProgress, Organization } from '$lib/db.server';
import Database from 'better-sqlite3';
const db = new Database("db/main.db", {});
db.pragma("journal_mode = WAL");

export function load({ params }) {
    const negotiation = DonationInProgress.fromId(params.slug);
    // const org = Organization.fromId(negotiation.org.id);
    
    let suggested_to_ask = Organization.calcPotentialDonation(negotiation.org);

	return {
        donation: negotiation.toJSON(),
        suggested_to_ask: suggested_to_ask.amount
	};
};

// export function updateNegotiation(donation: DonationInProgress) {
//     DonationInProgress.updateStage(donation);
// };
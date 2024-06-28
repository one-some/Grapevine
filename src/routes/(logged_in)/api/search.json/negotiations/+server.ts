import { DonationInProgress, Organization } from '$lib/db.server';

export function load({params}) {
    function updateNegotiation(donation: DonationInProgress) {
        DonationInProgress.updateStage(donation);
    };

    updateNegotiation();

} 

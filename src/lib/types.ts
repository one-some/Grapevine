export enum OrgType {
    // Must match SQL enum verification
    FOR_PROFIT,
    NON_PROFIT,
}

export enum NegotiationStage {
    INTEREST_INDICATED,
    PROPOSAL_MADE,
    AMOUNT_PROPOSED_SCHOOL,
    AMOUNT_PROPOSED_BUSINESS,
    AMOUNT_REFUSED_SCHOOL,
    AMOUNT_REFUSED_BUSINESS,
    AMOUNT_ACCEPTED,
    PAYMENT_MADE
}

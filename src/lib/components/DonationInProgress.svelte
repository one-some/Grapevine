<script lang="ts">
    import IconPerson from "virtual:icons/mdi/person";
    import IconShop from "virtual:icons/mdi/shop";
    import { commatizeNumber } from "$lib/util";
    import { NegotiationStage } from "$lib/types";

    export let donation;
</script>

{#if donation.donation_stage == NegotiationStage.INTEREST_INDICATED || donation.donation_stage == NegotiationStage.AMOUNT_PROPOSED_BUSINESS || donation.donation_stage == NegotiationStage.AMOUNT_REFUSED_BUSINESS}
    <donation class="school_action">
        <!-- HACK! -->
        <time>{new Date(donation.time_last_action * 1000).toDateString().split(" ").slice(1, 4).join(" ")}</time>
        <sep>―</sep>
        {#if donation.donation_stage == NegotiationStage.INTEREST_INDICATED}
            <org>
                <IconShop />
                <a href="/orgs/{donation.org.name}">{donation.org.name}</a>
            </org>
            <txt>has indicated interest in providing a donation</txt>
            <txt>through</txt>
            <person>
                <IconPerson />
                {donation.contact.name}
            </person>
        {:else if donation.donation_stage == NegotiationStage.AMOUNT_PROPOSED_BUSINESS}
            <org>
                <IconShop />
                <a href="/orgs/{donation.org.name}">{donation.org.name}</a>
            </org>
            <txt>has offered to donate</txt>
            <dollars>${commatizeNumber(donation.amountUsd)}</dollars>
            <txt>through</txt>
            <person>
                <IconPerson />
                {donation.contact.name}
            </person>
        {:else if donation.donation_stage == NegotiationStage.AMOUNT_REFUSED_BUSINESS}
            <org>
                <IconShop />
                <a href="/orgs/{donation.org.name}">{donation.org.name}</a>
            </org>
            <txt>has refused our offer to donate</txt>
            <dollars>${commatizeNumber(donation.amountUsd)}</dollars>
            <txt>through</txt>
            <person>
                <IconPerson />
                {donation.contact.name}
            </person>
        {/if}
        {#if donation.campaign}
            <txt>towards</txt>
            {donation.campaign.name}
        {/if}
        {#if donation.reason}
            <txt>for</txt>
            {donation.reason}
        {/if}
    </donation>
{:else}
    <donation>
        <!-- HACK! -->
        <time>{new Date(donation.time_last_action * 1000).toDateString().split(" ").slice(1, 4).join(" ")}</time>
        <sep>―</sep>
        {#if donation.donation_stage == NegotiationStage.PROPOSAL_MADE}
            <org>
                <IconShop />
                <a href="/orgs/{donation.org.name}">{donation.org.name}</a>
            </org>
            <txt>has been asked to provide a donation</txt>
            <txt>through</txt>
            <person>
                <IconPerson />
                {donation.contact.name}
            </person>
        {:else if donation.donation_stage == NegotiationStage.AMOUNT_PROPOSED_SCHOOL}
            <org>
                <IconShop />
                <a href="/orgs/{donation.org.name}">{donation.org.name}</a>
            </org>
            <txt>has been asked to donate</txt>
            <dollars>${commatizeNumber(donation.amountUsd)}</dollars>
            <txt>through</txt>
            <person>
                <IconPerson />
                {donation.contact.name}
            </person>
        {:else if donation.donation_stage == NegotiationStage.AMOUNT_ACCEPTED}
            <org>
                <IconShop />
                <a href="/orgs/{donation.org.name}">{donation.org.name}</a>
            </org>
            <txt>has agreed to donate</txt>
            <dollars>${commatizeNumber(donation.amountUsd)}</dollars>
            <txt>through</txt>
            <person>
                <IconPerson />
                {donation.contact.name}
            </person>
        {/if}
        {#if donation.campaign}
            <txt>towards</txt>
            {donation.campaign.name}
        {/if}
        {#if donation.reason}
            <txt>for</txt>
            {donation.reason}
        {/if}
    </donation>
{/if}

<style>
    donation {
        display: block;
        background-color: #00000010;
        transition: background-color 200ms;
        padding: 12px;
    }

    donation:hover {
        background-color: #ffffff20;
    }

    .school_action {
        background-color: #ffff0030;
    }
    .school_action:hover {
        background-color: #ffff0050;
    }

    time {
        font-weight: bold;
        font-size: 0.9em;
        display: inline-block;
    }

    sep {
        user-select: none;
        display: inline-block;
        opacity: 0.5;
        font-weight: bold;
    }

    txt {
        user-select: none;
    }

    org, person {
        position: relative;
        top: 4px;

        display: inline-flex;
        gap: 2px;
        align-items: center;

        font-weight: bold;
    }

    dollars {
        color: darkgreen;
        font-weight: bold;
    }
</style>

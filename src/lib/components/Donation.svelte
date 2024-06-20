<script lang="ts">
    import IconPerson from "virtual:icons/mdi/person";
    import IconShop from "virtual:icons/mdi/shop";
    import { commatizeNumber } from "$lib/util";

    export let donation;
</script>


<donation>
    <!-- HACK! -->
    <time>{new Date(donation.time * 1000).toDateString().split(" ").slice(1, 4).join(" ")}</time>
    <sep>―</sep>
    <txt>Contribution of</txt>
    <dollars>${commatizeNumber(donation.amountUsd)}</dollars>
    <txt>from</txt>
    <org>
        <IconShop />
        <a href="/orgs/{donation.org.name}">{donation.org.name}</a>
    </org>
    <txt>through</txt>
    <person>
        <IconPerson />
        {donation.contact.name}
    </person>
    {#if donation.campaign}
        <txt>towards</txt>
        {donation.campaign.name}
    {/if}
    {#if donation.reason}
        <txt>for</txt>
        {donation.reason}
    {/if}
</donation>

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

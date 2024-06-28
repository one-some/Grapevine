<script lang="ts">
    import type { Organization } from "../db.server";
    import { commatizeNumber } from "$lib/util";
    import IconShop from "virtual:icons/mdi/shop";

    export let org: Organization;
</script>

<a href={"/orgs/"+org.name} class="all">
    <donation class={"status-"+org.potentialStatus.toString()}>
        <org>
            <IconShop />
            <a href="/orgs/{org.name}">{org.name}</a>
        </org>
        {#if org.potentialStatus === 3}
            <txt>would probably be willing to make a donation of up to</txt>
            <dollars>${commatizeNumber(org.potentialDonation)}.</dollars>
        {:else if org.potentialStatus >= 1}
            <txt>might be willing to make a donation of up to</txt>
            <dollars>${commatizeNumber(org.potentialDonation)}.</dollars>
        {:else}
            <txt>probably will not be willing to make a donation for some time.</txt>
        {/if}
    </donation>
</a>

<style>
    .all {
        text-decoration: none;
        color: black;
    }

    donation {
        display: block;
        background-color: #00000010;
        transition: background-color 200ms;
        padding: 12px;
    }

    donation:hover {
        background-color: #ffffff20;
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

    .status-0 {
        background-color: #FF000030;
    }
    .status-1 {
        background-color: #FFAA0030;
    }
    .status-2 {
        background-color: #FFFF0030;
    }
    .status-3 {
        background-color: #00FF0030;
    }
    .status-0:hover {
        background-color: #FF000050;
    }
    .status-1:hover {
        background-color: #FFAA0050;
    }
    .status-2:hover {
        background-color: #FFFF0050;
    }
    .status-3:hover {
        background-color: #00FF0050;
    }
</style>
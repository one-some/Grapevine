<script>
    import CampaignMainPage from "$lib/components/CampaignMainPage.svelte";
    import DonationForCampaigns from "$lib/components/DonationForCampaigns.svelte";
    import { onMount } from "svelte";
    export let data;

    
    let showAddDonationModal = 'none'
    function show() {
        showAddDonationModal = 'fixed'
    }
</script>

<CampaignMainPage {...data.campaign}, --progress={String(data.campaign.money_donated / data.campaign.money_needed * 100) + "%"}/>

<button on:click={show}> Add Donation </button>

<div id="addDonationModal" style="display: {showAddDonationModal};">
    <form action="?/add_new_donation">
        <input type="text" name="amount_usd">
        <input type="text" name="contact_id">
        <input type="text" name="campaign_id">
        <input type="textarea" name="reason">
        <input type="submit">
    </form>
</div>

<div id="donations">
    {#each data.donations as donation}
        <DonationForCampaigns donation={donation} />
        <!-- <h2>{name.name}, {data.donations.moneys[i].amount_usd}</h2> -->

    {/each}
</div>

<style>
    #donations {
        display: inline-block;
    }

    button {
        display: inline-block;
    }

    #addDonationModal {
        display: none;
    }
</style>
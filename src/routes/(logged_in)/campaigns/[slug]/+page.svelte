<script>
    import CampaignMainPage from "$lib/components/CampaignMainPage.svelte";
    import DonationForCampaigns from "$lib/components/DonationForCampaigns.svelte";

    export let data;
</script>

<CampaignMainPage {...data.campaign}, --progress={String(data.campaign.money_donated / data.campaign.money_needed * 100) + "%"}/>

{#each data.donations as donation}
    <DonationForCampaigns donation={donation} />
    <!-- <h2>{name.name}, {data.donations.moneys[i].amount_usd}</h2> -->

{/each}
<script>
    import CampaignMainPage from "$lib/components/CampaignMainPage.svelte";
    import Donation from "$lib/components/Donation.svelte";

    export let data;
</script>

<CampaignMainPage {...data.campaign} />

{#each data.donations.names as name, i}

    <Donation org_name={name.name}, amount_usd={data.donations.moneys[i].amount_usd} />
    <!-- <h2>{name.name}, {data.donations.moneys[i].amount_usd}</h2> -->

{/each}
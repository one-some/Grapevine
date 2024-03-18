<script>
    import Campaign from "../../components/Campaign.svelte";
    import Donation from "../../components/Donation.svelte";

    export let data;
    console.log(data);
</script>

<Campaign {...data.campaign} />

{#each data.donations.names as name, i}

    <Donation org_name={name.name}, amount_usd={data.donations.moneys[i].amount_usd} />
    <!-- <h2>{name.name}, {data.donations.moneys[i].amount_usd}</h2> -->

{/each}
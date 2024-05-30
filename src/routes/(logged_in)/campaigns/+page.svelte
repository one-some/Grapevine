<script>
    import Campaign from "$lib/components/Campaign.svelte";
    export let data;
    console.log(data);
</script>

{#each data.campaings as campaign}
<Campaign {...campaign}, --progress={String(campaign.money_donated / campaign.money_needed * 100) + "%"}/>
{/each}
<script lang="ts">
    import SearchBar from "./SearchBar.svelte"
    import SideBar from "./SideBar.svelte"
    import PartnerCard from "$lib/PartnerCard.svelte"
</script>

<page>
    <h1>Grapevine</h1>

    <SearchBar />
    <SideBar />
    <PartnerCard />
</page>

<style> 
    :global(:root) {
        --accent-1: #6b2a99;
        --accent0: #9b36e3;
        --accent1: #903eca;
        --bg: #f1e6ff;
    }

    :global(body) {
        /* Slightly cool and dark background color */
        background-color: var(--bg);
    }

    page {
        display: flex;
        flex-direction: column;
        align-items: center;

        font-family: helvetica;
    }
</style>

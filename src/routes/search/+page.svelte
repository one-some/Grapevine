<script lang="ts">
    import SearchBar from "../components/SearchBar.svelte"

    import PartnerCard from "$lib/PartnerCard.svelte"

    import type { PageData } from "../$types";
    import { onMount } from "svelte";
    import type { Organization } from "$lib/db.server";
    
    export let data: PageData;
    let searchResults: Organization[];
    $: searchResults = [];

    async function updateSearchResults() {
        
        const params = {
            name: "e",
        };

        // TODO: Pretty sure theres a native JS interface for this
        let paramParts = [];
        for (const [k, v] of Object.entries(params)) {
            paramParts.push(`${k}=${v}`);
        }

        let paramString = "";
        if (paramParts.length) paramString = "?" + paramParts.join("&");

        const request = await fetch(`/api/search.json${paramString}`);
        const j = await request.json();

        // Weird syntax to update reactively
        searchResults = [...searchResults, ...j.results];
    }

    onMount(() => {
        updateSearchResults();
        console.log("HEllo", searchResults)
    })
</script>

<p>{data.hello}</p>
<SearchBar />
{#each searchResults as result}
    <PartnerCard partner={result}/>
{/each}

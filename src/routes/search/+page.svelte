<script lang="ts">
    import SearchBar from "../SearchBar.svelte"

    import PartnerCard from "$lib/PartnerCard.svelte"

    import type { PageData } from "../$types";
    export let data: PageData;
</script>

<p>{data.hello}</p>

<SearchBar />
<PartnerCard />

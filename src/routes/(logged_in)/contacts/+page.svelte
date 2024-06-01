<script lang="ts">
    import Contact from "$lib/components/Contact.svelte";
    import type { PageData } from "../$types";

    export let data: PageData;
</script>


{#each data.entries as contact}
    <Contact {...contact}/>
{/each}
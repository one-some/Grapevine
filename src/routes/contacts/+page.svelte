<script lang="ts">
    import Contact from "../components/Contact.svelte";
    import type { PageData } from "../$types";

    export let data: PageData;
    console.log(data.entries);
</script>



<Contact />
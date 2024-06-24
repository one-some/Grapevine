<script lang="ts">
    import SideBar from "$lib/components/SideBar.svelte"
    import JoeBot from "$lib/components/JoeBot.svelte"
</script>

<svelte:head>
    <title>Grapevine</title>
</svelte:head>

<page>
    <SideBar />
    <JoeBot />
    <content>
        <slot />
    </content>
</page>



<style> 
    :global(:root) {
        --accent-1: #6b2a99;
        --accent0: #9b36e3;
        --accent1: #903eca;
        --bg: #f1e6ff;
        --grape-green: #28c628;
    }

    :global(html, body) {
        height: 100%;
        width: 100%;
    }

    :global(body) {
        /* Slightly cool and dark background color */
        background-color: var(--bg);
        margin: 0px;
    }

    page {
        display: flex;
        flex-direction: row;

        font-family: helvetica;
        height: 100%;
        width: 100%;
    }
    
    page > * {
        flex: 1 1 0;
    }

    content {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        height: 100%;
        overflow-y: auto;
    }
</style>

<script lang="ts">
    import SearchBar from "./components/SearchBar.svelte"
</script>

<cont><greeting>Hello, Nicholas</greeting></cont>
<SearchBar />

<style>
    cont {
        width: 100%;
    }

    greeting {
        float: left;
        font-weight: bold;
        font-size: 37px;
        margin-left: 96px;
        margin-top: 28px;
        margin-bottom: 28px;
    }
</style>

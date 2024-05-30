<script>
    import Logo from "./Logo.svelte"
</script>


<nav>
    <div id="logo_container">
        <Logo />
    </div>
</nav>

<style>
    nav {
        display: grid;
        width: 100%;
        background-color: var(--accent0);
        background-color: var(--accent1);
        background: linear-gradient(135deg, var(--accent0), 60%, #7d4e85);

        border-right: 3px solid #ffffffbb;
    }

    #logo_container {
        justify-self: left;
        margin-left: 10px;
        margin-bottom: 10px;
        margin-top: 4px;
    }
</style>
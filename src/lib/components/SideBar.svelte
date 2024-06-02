<script lang="ts">
    import Logo from "./Logo.svelte";
    import SidebarButton from "./SidebarButton.svelte";
</script>

<sidebar>
    <Logo />

    <hr>

    <SidebarButton text="Home" link="/" />
    <SidebarButton text="Search" link="/search" />
    <SidebarButton text="Campaigns" link="/campaigns"/>
    <SidebarButton text="Documentation" link="/documentation"/>

    <SidebarButton text="Logout" link="logout"/>
</sidebar>

<style>
    sidebar {
        display: block;
        font-family: sans-serif;

        height: 100%;
        background-color: var(--accent0);
        background-color: var(--accent1);
        background: linear-gradient(135deg, var(--accent0), 60%, #7d4e85);

        border-right: 3px solid #ffffffbb;
    }

    hr {
        margin: 10px 6px;
        border: 1px solid #ffffff66;
    }
</style>

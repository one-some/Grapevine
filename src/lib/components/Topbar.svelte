<script>
    import Logo from "./Logo.svelte"
    import TopbarButton from "./TopbarButton.svelte";
</script>


<nav>
    <div id="logo_container">
        <Logo />

        <div id="about">
            <TopbarButton text="About Us" link="/about" />
        </div>
        <div id="login">
            <TopbarButton text="Login" link="/login" />
        </div>
        <div id="register">
            <TopbarButton text="Register" link="/register" />
        </div>
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

        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
        gap: 10px;
        grid-auto-rows: minmax(50px, auto);
        width: 100%;
    }
    #about {
        grid-column: 8;
    }
    #login {
        grid-column: 9;
    }
    #register {
        grid-column: 10;
    }
</style>
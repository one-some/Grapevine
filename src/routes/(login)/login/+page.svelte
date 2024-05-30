<script>
    import Topbar from "$lib/components/Topbar.svelte";
    export let form;
</script>
<Topbar />

<div id="login-box">
    <form method="POST" action="?/authenticate">
        <label for="email">Email</label>
        <br>
        <input type="text" name="email">
        <br>
        <label for="password">Password</label>
        <br>
        <input type="password" name="password">
        <br>
        <button type="submit">Login</button>
        <p id="error">
            {#if form?.message}
            {form?.message}
            {/if}
        </p>
        <h1>Don't have an account? <a href="/register">Register here.</a></h1>
    </form>
</div>

<style>

    form {
        display: grid;
    }

    p {
        color: red;

    }

    #login-box {
        display: grid;
        background-color: white;
        justify-self: center;
        justify-content: center;
        width: 30%;
        margin-top: 15%;
        padding-top: 20px;
        padding-bottom: 20px;
        border-radius: 20px;
    }

    label {
        justify-self: center;
        font-size: large;
        font-weight: bold;
    }

    h1 {
        display: inline-block;
        font-size: 14px;
        margin-bottom: 10px;
    }
    
    button {
        background-color: var(--accent-1);
        color: white;
        font-weight: 1000;
        border-radius: 20px;
        border-width: 1px;
    }

</style>
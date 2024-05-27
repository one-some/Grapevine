<script>
    import Topbar from "../../components/Topbar.svelte";
    export let form;
</script>
<Topbar />

<div id="login-box">
    <form method="POST" action="?/authenticate">
        <label for="username">Username</label>
        <br>
        <input type="text" name="username">
        <br>
        <label for="password">Password</label>
        <br>
        <input type="password" name="password">
        <br>
        <input type="submit">
        <p id="error">
            {#if form?.message}
            {form?.message}
            {/if}
        </p>
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


</style>
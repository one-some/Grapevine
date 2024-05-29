<script lang='ts'>
    import Topbar from "../../components/Topbar.svelte";
    export let form;
    let password = '';
    let length = 'gray';
    let uppercase = 'gray';
    let lowercase = 'gray';
    let number = 'gray';
    let special = 'gray';

    $: if (password.length > 8)
    { length = 'green' }
    else
    { length = 'red' }

    $: if(/(?=.*[A-Z])/.test(password))
    { uppercase = 'green' }
    else
    { uppercase = 'red'}

    $: if(/(?=.*[a-z])/.test(password)) 
    { lowercase = 'green'}
    else
    { lowercase = 'red'}

    $: if(/(?=.*[0-9])/.test(password))
    { number = 'green' }
    else
    { number = 'red' }

    $: if (/(?=.*[!@#$%^&*_\-+=\(\)])/.test(password))
    { special = 'green' }
    else
    { special = 'red'}

    let pass_reqs_box_display = 'none';

    function show() {
        pass_reqs_box_display = 'block';
        console.log('updated');
    }

</script>
<Topbar />

{#if !form?.success}
<div id="register-box">
    <form method="POST" action="?/register">
        <label for="first_name">First Name</label>
        <br>
        <input type="text" name="first_name">
        <br>
        <label for="last_name">Last Name</label>
        <br>
        <input type="text" name="last_name">
        <br>
        <label for="email">Email</label>
        <br>
        <input type="text" name="email">
        <br>
        <label for="password">Password</label>
        <br>
        <input type="password" name="password" bind:value={password} on:focus={show}>
        <br>
        <div id="password-requirements-box" style="display: {pass_reqs_box_display};">
            <li id="length" style="color: {length}">Password must have 8 or more characters</li>
            <li id="uppercase" style="color: {uppercase}">Password must at least 1 uppercase character</li>
            <li id="lowercase" style="color: {lowercase}">Password must at least 1 lowercase character</li>
            <li id="number" style="color: {number}">Password must have at least 1 number</li>
            <li id="special" style="color: {special}">Password must have at least 1 special character (!@#$%^&*+=)</li>
        </div>
        <br>
        <label for="confirm_password">Confirm Password</label>
        <br>
        <input type="password" name="confirm_password">
        <br>
        <button type="submit">Register</button>
        <p id="error">
            {#if form?.message}
            {form?.message}
            {/if}
        </p>
        <h1>Already have an account? <a href="/login">Login here.</a></h1>
    </form>
</div>
{/if}

{#if form?.success}
<div id="success-box">
    <h2>Success!</h2>
    <h3>You will be redirected to the login page shortly.</h3>
    <h1><a href="/login">Go to login now.</a></h1>
</div>

<script>
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));     // As seen in https://www.sitepoint.com/delay-sleep-pause-wait/
    }

    sleep(5000).then(() => { window.location = '/login'; });
</script>
{/if}

<style>

    form {
        display: grid;
    }

    p {
        color: red;
    }

    li {
        font: 10px;
        color: grey;
        margin-top: 2px;
        margin-bottom: 2px;
    }

    input {
        width: 250px;
        justify-self: center;
    }

    #register-box {
        display: grid;
        background-color: white;
        justify-self: center;
        justify-content: center;
        width: 35%;
        margin-top: 5%;
        padding-top: 20px;
        padding-bottom: 20px;
        border-radius: 20px;
    }

    #success-box {
        display: grid;
        background-color: white;
        justify-self: center;
        justify-content: center;
        width: 35%;
        margin-top: 5%;
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
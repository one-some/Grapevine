<script>
    import Topbar from "$lib/components/Topbar.svelte";
    // import Logo from "$lib/components/Logo.svelte";
    import { onMount } from "svelte";
    export let form, data;

    onMount(() => {
        if(data.message){
            alert(data.message);
        }
    })                                      //  If you can move this to a +page.ts, please do. Also, why is the syntax highlighting making it red????
</script>

<Topbar />

<div id="mainstuff">
    <div id="logo">
        <img src="/logo.jpg" alt="Bunch of Grapes">
    </div>
    <logo-container>
        <h1>Grapevine</h1>
    </logo-container>
    <div id="motto">
        <p>Simple, straightforward management without compromising functionality.</p>
    </div>
    <div id="brag">
        <p>
            We designed every inch of Grapevine with the customer in mind. Computer
            expert and computer novice alike will find our system intuitive and 
            understandable. Nevertheless, Grapevine will prove to be robust and
            versatile, competing in functionality with the most advanced and obtuse
            applications. Never again will you have to sacrifice functionality for 
            usability.
        </p>
    </div>
</div>

<style>
    #mainstuff {
        width: max(80%, min(800px, 90%));
        /* margin-left: 10%; */
        margin: auto;
        margin-top: 50px;
        
        /* background-color: white;
        justify-self: center;
        justify-content: center;
        margin-top: 15%;
        padding-top: 20px;
        padding-bottom: 20px;
        border-radius: 20px; */
    }
    #logo {
        display: flex;
        justify-content: center;
    }
    logo-container {
        display: flex;
        color: #7d4e85;
        align-items: center;
        justify-content: center;
        height: 130px;

        position: relative;
        top: 4px;

        font-size: 50px;
        text-shadow:
        -1px -1px 0 #000,
        1px -1px 0 #000,
        -1px 1px 0 #000,
        1px 1px 0 #000;
    }
    #motto {
        width: max(60%, min(600px, 90%));
        margin: auto;
        font-size: 35px;
        text-align: center;
    }
    #brag {
        width: max(60%, min(600px, 90%));
        margin: auto;
        font-size: 25px;
        text-align: justify;
    }
</style>
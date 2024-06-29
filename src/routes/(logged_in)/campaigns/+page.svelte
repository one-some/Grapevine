<script>
    import CampaignBox from "$lib/components/CampaignBox.svelte";
    import IconPlus from "virtual:icons/mdi/plus";
    import IconMinus from "virtual:icons/mdi/minus";
    export let data, form;

    let showNewCampaignForm = 'none'
    function show() {
        showNewCampaignForm = 'block'
    }

    if(form?.message) {
        show();
    }
</script>






<div id="add-or-remove-bar">
    <div id="add-button" class="bar-button" on:click={show}>
        <IconPlus />
    </div>
    <div id="remove-button" class="bar-button">
        <IconMinus />
    </div>
</div>

<div id="input-campaign-entry" style="display: {showNewCampaignForm};">
    <h1>
        New Campaign
    </h1>
    <form action="?/add_new_campaign" method="POST">
        <input type="title" id="input-title" placeholder="Title">
        <input type="description" id="input-description" placeholder="Enter a description here">
        <input type="goal" id='input-goal' placeholder="Goal">
        <br>
        <input type="submit" id="new-campaign-submit-button">
        {#if (form?.message)}
        <p id="error">
            {form?.message}
        </p>
        {/if}
    </form>
</div>

{#each data.campaings as campaign}
<CampaignBox {...campaign} --progress={String(campaign.money_donated / campaign.money_needed * 100) + "%"}/>
{/each}

<style>

    #input-title {
        display: block;
        font-size: 2em;
        margin-block-start: 0.67em;
        margin-block-end: 0.67em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        font-weight: bold;
        unicode-bidi: isolate;
    }

    #input-goal {
        margin-bottom: 10px;
    }

    #add-or-remove-bar {
        background-color: white;
        width: calc(100% - 16px);
        margin-bottom: 10px;
        margin-top: 5px;
    }

    #add-or-remove-bar > * {
        margin-left: 10px;
    }

    .bar-button:hover {
        backdrop-filter: brightness(80%);
    }
    
    /* #add-or-remove-bar {
        display: flex;
        float: left;
        background-color: white;
    } */

    .bar-button {
        display: inline-block;
        font-size: 20px;
    }

    #input-description {
    display: block;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
    unicode-bidi: isolate;
    }

    #input-campaign-entry:hover{
        filter:brightness(80%);
    }

    #input-campaign-entry {
        background-color: white;
        width: calc(100% - 16px);
        margin-bottom: 10px;
    }

    #input-campaign-entry > * {
        margin-left: 10px;
    }

    #error {
        color: red;
    }

    /* #new-campaign-submit-button {
        background-color: var(--accent-1);
        color: white;
        font-weight: 1000;
        border-radius: 20px;
        border-width: 1px;
        margin-bottom: 10px;
    } */
</style>

<!-- <script>
    export let title, desc, money_donated, money_needed;

    console.log(title, desc);
</script>

<a href="campaigns/{title}" id="campaign-entry">
    <h1>
        {title}
    </h1>
    <h2>
        {desc}
    </h2>
    <h1 id="fraction">
        {money_donated} / {money_needed}
    </h1>
    <div id="progress-bar">
        <div id="bar-progress"></div>
    </div>
</a>
<style>

    #campaign-entry:hover{
        filter:brightness(80%);
    }

    #progress-bar {
        background-color: grey;
        height: 30px;
    /*width: calc(100% - 32px);*/
        width: 50%;
        align-self: center;
        border-radius: 15px;
        margin-bottom: 10px;
    }

    #fraction {
        display: inline-block;
    }

    #bar-progress {
        background-color: limegreen;
        width: var(--progress);
        height: 30px;
        border-radius: 15px;
    }

    #campaign-entry {
        background-color: white;
        width: calc(100% - 16px);
        margin-bottom: 10px;
    }

    #campaign-entry > * {
        margin-left: 10px;
    }

    h2 {
        color: grey;
        font-size: 15px;
    }
    a:link { 
  text-decoration: none; 
} 
a:visited { 
  text-decoration: none; 
} 
a:hover { 
  text-decoration: none; 
} 
a:active { 
  text-decoration: none; 
}

</style> -->
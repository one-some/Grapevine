<script>
    export let org_name, amount_usd;
</script>



<div id="donation-box">
    <h1>
        {org_name}
    </h1>
    <h1>
        Amount: {amount_usd}
    </h1>
</div>

<style>

    h1 {
        margin-left: 10px;
        margin-bottom: 0px;
    }

    #donation-box {
        /* HACK: 100% - margin * 2 */
        width: calc(100% - 16px);
        padding: 5px;
        margin: 8px;

        background-color: white;
        border-color: black;
        border-width: 1px;
        display: block;
    }


    #people-contact-subtext {
        color: grey;
        display: block;
    }
</style>
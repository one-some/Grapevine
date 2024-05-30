<script>
    export let name, phone_number, email;
</script>


<div id="people-contact-box">
    <h1>
        {name}
    </h1>
    <div id="people-contact-subtext">
        <h2>
            Phone Number: {phone_number}
        </h2>
        <h2>
            E-mail: {email}
        </h2>
    </div>
</div>

<style>
    h2{
        font-size: 15px;
    }

    h1 {
        margin-left: 10px;
        margin-bottom: 0px;
    }

    #people-contact-box {
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
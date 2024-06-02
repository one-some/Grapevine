<!-- i want icons but npm wants to pull some total nonsense and compile stuff likwe what the heck -->
<script>
    // https://icon-sets.iconify.design/mdi/
    import IconHandshake from "virtual:icons/mdi/handshake";
    import IconContact from "virtual:icons/mdi/contact";
    import IconShop from "virtual:icons/mdi/shop";
    import IconGavel from "virtual:icons/mdi/gavel";
    import IconWorker from "virtual:icons/mdi/worker";
    import IconAttachMoney from "virtual:icons/mdi/attach-money";
    import IconMoneyOff from "virtual:icons/mdi/money-off";
    import IconPhone from "virtual:icons/mdi/phone";
    import IconEmail from "virtual:icons/mdi/email";
    import IconPerson from "virtual:icons/mdi/person";

    export let data;
    console.log(data);
</script>

<big>
    <left>
        <h2><IconShop />{data.name}</h2>
        <field>
            <lab><IconGavel />Type</lab>
            {#if data.contact.org_type == "FOR_PROFIT"}
                <IconAttachMoney />
                For-Profit
            {:else}
                <IconMoneyOff />
                Non-Profit
            {/if}
        </field>
        <field>
            <lab><IconWorker />Employee Count</lab>
            {data.contact.employee_count}
        </field>
        <p id="desc">{data.contact.desc}</p>
    </left>
    <right>
        <top>
            <h2><IconContact />Contacts</h2>
            <container>
                {#each data.people as info}
                    <guy>
                        <h2><IconPerson/>{`${info.first_name} ${info.last_name}`}</h2>
                        <field>
                            <lab><IconPhone />Phone</lab>
                            {info.phone}
                        </field>
                        <field>
                            <lab><IconEmail />Email</lab>
                            <a href="mailto:{info.email}">{info.email}</a>
                        </field>
                    </guy>
                {/each}
            </container>
        </top>
        <bottom>
            <h2><IconHandshake />Contributions</h2>
        </bottom>
    </right>
</big>

<style>
    big {
        width: 100%;
        flex-grow: 1;
        display: flex;
        font-family: sans-serif;
    }

    h2, lab, field {
        margin: 0px;
        display: flex;
        align-items: center;
        gap: 4px;
    }

    lab {
        display: inline-flex;
        font-weight: bold;
        user-select: none;
    }

    field {
        margin-left: 8px;
        gap: 8px;
    }

    right {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    big > * {
        margin: 10px;
    }

    big > *, right > *{
        flex: 1 0 0;
    }

    left, top, bottom {
        padding: 20px;
        background-color: white;
        border-radius: 16px;
        min-height: 0;
    }

    top {
        display: flex;
        flex-direction: column;
    }

    #desc {
        font-style: italic;
        font-size: 20px;
    }

    container {
        display: flex;
        flex-direction: column;
        gap: 12px;
        overflow-x: auto;
        flex-grow: 1;
    }

    guy {
        display: block;
        font-size: 0.8em;
        padding: 8px;
        border-radius: 10px;
        padding-left: 24px;
        transition: background-color 200ms;
        background-color: #00000010;
    }

    guy a {
        color: black;
    }

    guy field {
        padding-left: 12px;
    }

    guy:hover {
        background-color: #00000022;
    }
</style>

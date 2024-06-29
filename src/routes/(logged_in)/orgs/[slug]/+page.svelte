<!-- i want icons but npm wants to pull some total nonsense and compile stuff likwe what the heck -->
<script lang="ts">
    import Donation from "$lib/components/Donation.svelte";
    import { OrgType } from '$lib/types';

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
    import IconEdit from "virtual:icons/mdi/edit";
    import DonationInProgress from "$lib/components/DonationInProgress.svelte";
    import { onMount } from "svelte";

    export let data, form;

    let editModalBind: HTMLElement;
    let editModalHidden = true;

    function commatize(n) {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function clickDismiss(event: PointerEvent) {
        if (event.target !== editModalBind) return;
        editModalHidden = true;
    }

    data.donations.sort((a, b) => b.time-a.time);
    data.ongoingNegotiations.sort((a, b) => b.time-a.time);

    onMount(() => {
        document.body.appendChild(editModalBind);
        console.log(form?.message);
        if (form?.message !== "All Good!" && form?.message) {
            editModalHidden = false;
        }
    });
</script>

<big>
    <left>
        <top>
            <h2 on:click={() => editModalHidden = false}><IconShop />{data.org.name}<IconEdit /></h2>
            <field>
                <lab><IconGavel />Type</lab>
                {#if data.org.orgType == OrgType.FOR_PROFIT}
                    <IconAttachMoney />
                    For-Profit
                {:else}
                    <IconMoneyOff />
                    Non-Profit
                {/if}
            </field>
            <field>
                <lab><IconWorker />Employee Count</lab>
                {data.org.employeeCount}
            </field>
            <field>
                <lab><IconAttachMoney />Yearly Revenue</lab>
                ${commatize(data.org.annual_profit)}
            </field>
            <p id="desc">{data.org.desc}</p>
        </top>
        <bottom>
            <h2><IconHandshake />Ongoing Negotiations</h2>
            <container>
                {#each data.ongoingNegotiations as donation}
                    <DonationInProgress {donation} />
                {/each}
            </container>
        </bottom>
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
            <container>
                {#each data.donations as donation}
                    <Donation {donation} />
                {/each}
            </container>
        </bottom>
    </right>
</big>


<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<modal bind:this={editModalBind} class:hidden={editModalHidden} on:click={clickDismiss}>
    <editor>
        <modal-label>Edit Contact</modal-label>
        <form id="new_business" action="?/add_new_business" method="POST">
            <content>
                <block-cont>
                    <input name="name" placeholder="New Partner" value={data.org.name} />
                </block-cont>
                <block-cont>
                    <faint>Company Type:</faint>
                    <select form="new_business" name="type">
                        <option value="NON_PROFIT">Non-Profit</option>
                        <option value="FOR_PROFIT">For-Profit</option>
                    </select>
                </block-cont>
                <block-cont>
                    <faint>Location:</faint>
                    <input name="city" value="Lafayette" placeholder="City">,
                    <select form="new_business" name="state">
                        <option>Louisiana</option>
                        <option>Alabama</option>
                        <option>Alaska</option>
                        <option>Arizona</option>
                        <option>Arkansas</option>
                        <option>California</option>
                        <option>Colorado</option>
                        <option>Connecticut</option>
                        <option>Delaware</option>
                        <option>Florida</option>
                        <option>Georgia</option>
                        <option>Hawaii</option>
                        <option>Idaho</option>
                        <option>Illinois</option>
                        <option>Indiana</option>
                        <option>Iowa</option>
                        <option>Kansas</option>
                        <option>Kentucky</option>
                        <option>Maine</option>
                        <option>Maryland</option>
                        <option>Massachusetts</option>
                        <option>Michigan</option>
                        <option>Minnesota</option>
                        <option>Mississippi</option>
                        <option>Missouri</option>
                        <option>Montana</option>
                        <option>Nebraska</option>
                        <option>Nevada</option>
                        <option>New Hampshire</option>
                        <option>New Jersey</option>
                        <option>New Mexico</option>
                        <option>New York</option>
                        <option>North Carolina</option>
                        <option>North Dakota</option>
                        <option>Ohio</option>
                        <option>Oklahoma</option>
                        <option>Oregon</option>
                        <option>Pennsylvania</option>
                        <option>Rhode Island</option>
                        <option>South Carolina</option>
                        <option>South Dakota</option>
                        <option>Tennessee</option>
                        <option>Texas</option>
                        <option>Utah</option>
                        <option>Vermont</option>
                        <option>Virginia</option>
                        <option>Washington</option>
                        <option>West Virginia</option>
                        <option>Wisconsin</option>
                        <option>Wyoming</option>
                </block-cont>
                <block-cont>
                    <faint>Company Size:</faint>
                    <input name="company_size" type="number" value={data.org.employeeCount} placeholder="Employees">
                    <faint>Employees</faint>
                </block-cont>
                <block-cont>
                    <faint>
                        Annual Profit: $
                    </faint>
                    <input name="annual_profit" type="number" value={data.org.annual_profit} placeholder="Profit">
                </block-cont>
                <block-cont>
                    <faint>
                        Brief Description:
                    </faint>
                </block-cont>
                <block-cont>
                    <textarea name="desc" id="desc" value={data.org.desc}></textarea>
                </block-cont>
            </content>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <input type="submit" id="big-button">
            {#if (form?.message) && form?.message !== "All Good!"}
            <p id="error">
                {form?.message}
            </p>
            {/if}
        </form>
    </editor>
</modal>


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

    left, right {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    big > * {
        margin: 10px;
    }

    big > *, right > *, left > *{
        flex: 1 0 0;
    }

    top, bottom {
        padding: 20px;
        background-color: white;
        border-radius: 16px;
        min-height: 0;
    }

    top, bottom {
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
    
    modal {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: 0px;
        top: 0px;
        background-color: #000000AA;
        width: 100%;
        height: 100%;
        font-family: helvetica;
        opacity: 1;
        transition: opacity 500ms;
    }

    modal.hidden {
        opacity: 0;
        pointer-events: none;
    }

    content {
        display: block;
        margin: 12px;
    }

    block-cont {
        display: block;
    }

    faint {
        opacity: 0.7;
        font-size: 16px;
    }

    block-cont {
        font-size: 1.2em;
        margin-bottom: 12px;
    }

    editor {
        background-color: white;
        width: 40%;
        height: 80%;
        border-radius: 16px;
    }

    modal-label {
        display: block;
        background-color: var(--accent-1);
        color: white;
        text-align: center;
        padding: 12px;
        font-weight: bold;
    }

    modal-label.error {

    }

    #name {
        font-size: 1.7em;
        border: none;
        border-bottom: 2px solid gray;
        outline: none;
        margin-bottom: 12px;
    }

    big-button, #big-button {
        background-color: var(--grape-green);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 12px;
        margin: 12px;
        border-radius: 8px;
        cursor: pointer;
        color: white;
        font-weight: bold;
        width: 95%;
    }

    #new-button {
        width: 25%;
    }

    #desc {
        width: 100%;
    }

    input, textarea, select {
        font-size: 16px;
    }
    textarea {
        resize: none;
        height: 75px;
        font-family: sans-serif;
    }

    #error {
        font-size: 20px;
        color: #CC0000FF;
        font-weight: bold;
        display: inline-flex;
        padding: 10px;
    }
</style>

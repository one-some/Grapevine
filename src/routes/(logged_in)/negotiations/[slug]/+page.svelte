<script lang="ts">
    
    // https://icon-sets.iconify.design/mdi/
    import IconHandshake from "virtual:icons/mdi/handshake";
    import IconShop from "virtual:icons/mdi/shop";
    import IconPerson from "virtual:icons/mdi/person";
    import IconAlert from "virtual:icons/mdi/alert";
    import DonationInProgress from "$lib/components/DonationInProgress.svelte";
    import { NegotiationStage } from '$lib/types';
    import { onMount } from "svelte";
    // import { updateNegotiation } from "./+page.server.js";

    export let data;

    let modalBind: HTMLElement;
    let donationAmountBind: HTMLInputElement;
    let modalHidden: boolean = true;

    let business_not_school = false;

    function commatize(n) {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function inMoneyStage(donation_stage) {
        if (donation_stage == NegotiationStage.AMOUNT_PROPOSED_SCHOOL || 
            donation_stage == NegotiationStage.AMOUNT_PROPOSED_BUSINESS || 
            donation_stage == NegotiationStage.AMOUNT_ACCEPTED || 
            donation_stage == NegotiationStage.PAYMENT_MADE) {
            return true;
        }
        return false;
    }
    function inSchoolNextAction(donation_stage) {
        if (donation_stage == NegotiationStage.INTEREST_INDICATED || 
            donation_stage == NegotiationStage.AMOUNT_PROPOSED_BUSINESS || 
            donation_stage == NegotiationStage.AMOUNT_REFUSED_BUSINESS) {
            return true;
        }
        return false;
    }

    function toBusinessActions() {
        business_not_school = true;
    }
    function toSchoolActions() {
        business_not_school = false;
    }
    // UPDATE (table) SET (x = ?) WHERE (x = 1);

    function stageChange() {
        data.donation.time_last_action = Date.now()/1000;
        // fetch("/api/negotiations", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(data.donation)});
        // updateNegotiation(data.donation);
    };

    function toInterestIndicated() {
        data.donation.donation_stage = NegotiationStage.INTEREST_INDICATED;
        stageChange();
    }
    function toAmountProposedBusiness() {
        data.donation.donation_stage = NegotiationStage.AMOUNT_PROPOSED_BUSINESS;
        stageChange();
        modalHidden = false;
    }
    function toAmountRefusedSchool() {
        data.donation.donation_stage = NegotiationStage.AMOUNT_REFUSED_SCHOOL;
        stageChange();
    }
    function toAmountRefusedBusiness() {
        data.donation.donation_stage = NegotiationStage.AMOUNT_REFUSED_BUSINESS;
        stageChange();
    }
    function toProposalMade() {
        data.donation.donation_stage = NegotiationStage.PROPOSAL_MADE;
        stageChange();
    }
    function toAmountProposedSchool() {
        data.donation.donation_stage = NegotiationStage.AMOUNT_PROPOSED_SCHOOL;
        stageChange();
        modalHidden = false;
    }
    function toAmountAccepted() {
        data.donation.donation_stage = NegotiationStage.AMOUNT_ACCEPTED;
        stageChange();
    }
    function toEndNegotiation() {
        stageChange();
    }
    function toQueryStatus() {
        stageChange();
    }

    function clickDismiss(event: PointerEvent) {
        if (event.target !== modalBind) return;
        modalHidden = true;
    }

    function submitNewDonationAmount() {
        modalHidden = true;
        data.donation.amountUsd = parseInt(donationAmountBind.value);
    }

    onMount(() => {
        document.body.appendChild(modalBind);
    });
</script>

<big>
    <top>
        <h2><IconHandshake />Negotiation with <a href={"/orgs/"+data.donation.org.name}>{data.donation.org.name}</a></h2>
        <field>
            Contact through
            <lab><IconPerson />{data.donation.contact.name}</lab>
        </field>
        <field>
            Negotiation begun
            <lab><IconAlert /></lab>
            <time>{new Date(data.donation.time_started * 1000).toDateString().split(" ").slice(1, 4).join(" ")}</time>
        </field>
        <field>
            Last action taken
            <lab><IconAlert /></lab>
            <time>{new Date(data.donation.time_last_action * 1000).toDateString().split(" ").slice(1, 4).join(" ")}</time>
        </field>
        {#if inMoneyStage(data.donation.donation_stage)}
        <field>
            <lab>Current Proposed Amount</lab>
            ${commatize(data.donation.amountUsd)}
        </field>
        {/if}
        <textbox>
            <lab>
                <IconShop />
                <a href="/orgs/{data.donation.org.name}">{data.donation.org.name}</a>
            </lab>
            {#if data.donation.donation_stage == NegotiationStage.INTEREST_INDICATED}
                <txt>has indicated interest in providing a donation.</txt>
            {:else if data.donation.donation_stage == NegotiationStage.AMOUNT_PROPOSED_BUSINESS}
                <txt>has offered to donate</txt>
                <dollars>${commatize(data.donation.amountUsd)}.</dollars>
            {:else if data.donation.donation_stage == NegotiationStage.AMOUNT_REFUSED_SCHOOL}
                <txt>'s offer of </txt>
                <dollars>${commatize(data.donation.amountUsd)}</dollars>
                <txt>has been refused by the school.</txt>
            {:else if data.donation.donation_stage == NegotiationStage.AMOUNT_REFUSED_BUSINESS}
                <txt>has refused our offer to donate</txt>
                <dollars>${commatize(data.donation.amountUsd)}.</dollars>
            {:else if data.donation.donation_stage == NegotiationStage.PROPOSAL_MADE}
                <txt>has been asked to provide a donation.</txt>
            {:else if data.donation.donation_stage == NegotiationStage.AMOUNT_PROPOSED_SCHOOL}
                <txt>has been asked to donate</txt>
                <dollars>${commatize(data.donation.amountUsd)}.</dollars>
            {:else if data.donation.donation_stage == NegotiationStage.AMOUNT_ACCEPTED}
                <txt>has agreed to donate</txt>
                <dollars>${commatize(data.donation.amountUsd)}.</dollars>
            {/if}
        </textbox>
        
        <button-area>
            <tabs>
                {#if !business_not_school}
                    <tab on:click={toSchoolActions} class="active-tab">School</tab>
                    <tab on:click={toBusinessActions}>Business</tab>
                {:else}
                    <tab on:click={toSchoolActions}>School</tab>
                    <tab on:click={toBusinessActions} class="active-tab">Business</tab>
                {/if}
            </tabs>
            <actions>
                {#if data.donation.donation_stage == NegotiationStage.INTEREST_INDICATED}
                    {#if !business_not_school}
                        <button on:click={toAmountProposedSchool} class="school-action">Propose Amount</button>
                        <button on:click={toEndNegotiation} class="end-action">End Negotiation</button>
                    {:else}
                        <button on:click={toAmountProposedBusiness} class="business-action">Amount Proposed</button>
                        <button on:click={toEndNegotiation} class="end-action">End Negotiation</button>
                    {/if}
                {:else if data.donation.donation_stage == NegotiationStage.AMOUNT_PROPOSED_BUSINESS}
                    {#if !business_not_school}
                        <button on:click={toAmountAccepted} class="school-action">Accept Amount</button>
                        <button on:click={toAmountProposedSchool} class="school-action">Suggest Amount</button>
                    {:else}
                        <button on:click={toInterestIndicated} class="business-action">Offer Retracted</button>
                        <button on:click={toAmountProposedBusiness} class="business-action">Offer Changed</button>
                    {/if}
                {:else if data.donation.donation_stage == NegotiationStage.AMOUNT_REFUSED_SCHOOL}
                    {#if !business_not_school}
                        <button on:click={toAmountProposedSchool} class="school-action">Propose Amount</button>
                        <button on:click={toEndNegotiation} class="end-action">End Negotiation</button>
                    {:else}
                        <button on:click={toAmountProposedBusiness} class="business-action">Amount Proposed</button>
                        <button on:click={toEndNegotiation} class="end-action">End Negotiation</button>
                    {/if}
                {:else if data.donation.donation_stage == NegotiationStage.AMOUNT_REFUSED_BUSINESS}
                    {#if !business_not_school}
                        <button on:click={toAmountProposedSchool} class="school-action">Propose Amount</button>
                        <button on:click={toEndNegotiation} class="end-action">End Negotiation</button>
                    {:else}
                        <button on:click={toAmountProposedBusiness} class="business-action">Amount Proposed</button>
                        <button on:click={toEndNegotiation} class="end-action">End Negotiation</button>
                    {/if}
                {:else if data.donation.donation_stage == NegotiationStage.PROPOSAL_MADE}
                    {#if !business_not_school}
                        <button on:click={toAmountProposedSchool} class="school-action">Propose Amount</button>
                        <button on:click={toEndNegotiation} class="end-action">End Negotiation</button>
                    {:else}
                        <button on:click={toAmountProposedBusiness} class="business-action">Amount Proposed</button>
                        <button on:click={toEndNegotiation} class="end-action">End Negotiation</button>
                    {/if}
                {:else if data.donation.donation_stage == NegotiationStage.AMOUNT_PROPOSED_SCHOOL}
                    {#if !business_not_school}
                        <button on:click={toInterestIndicated} class="business-action">Retract Offer</button>
                        <button on:click={toAmountProposedSchool} class="business-action">Change Offer</button>
                    {:else}
                        <button on:click={toAmountAccepted} class="school-action">Amount Accepted</button>
                        <button on:click={toAmountProposedBusiness} class="school-action">Amount Suggested</button>
                    {/if}
                {:else if data.donation.donation_stage == NegotiationStage.AMOUNT_ACCEPTED}
                    {#if !business_not_school}
                        <button on:click={toQueryStatus} class="school-action">Query Status</button>
                        <button on:click={toProposalMade} class="school-action">Renegotiate</button>
                    {:else}
                        <button on:click={toProposalMade} class="school-action">Renegotiate</button>
                        <button on:click={toEndNegotiation} class="business-action">Payment Made</button>
                    {/if}
                {/if}
            </actions>
        </button-area>
    </top>
</big>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<modal bind:this={modalBind} class:hidden={modalHidden} on:click={clickDismiss}>
    <editor>
        <modal-label>Enter a Donation Amount</modal-label>
        <content>
            <block-cont>
                <input bind:this={donationAmountBind} type="number" id="donation_amount" placeholder="Enter an amount..." value={data.suggested_to_ask} />
                <txt>Dollars.</txt>
            </block-cont>
        </content>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <big-button on:click={submitNewDonationAmount}>Save</big-button>
    </editor>
</modal>

<style>
    big {
        width: 60%;
        flex-grow: 1;
        display: flex;
        font-family: sans-serif;
    }

    h2, lab, field, textbox {
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

    textbox {
        margin: auto;
        /* margin-top: 50px; */
        width: 90%;
        display: block;
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
        width: 60%;
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

    time {
        font-weight: bold;
    }

    tabs, actions {
        margin-top: 8px;
        display: flex;
    }

    tabs > *, actions > * {
        flex-grow: 1;
    }

    tabs {
        width: 40%;
        background-color: #00000040;
        border-radius: 4px;
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
    }

    actions {
        background-color: #00000040;
        margin-top: 0px;
        border-radius: 4px;
        border-top-left-radius: 0px;
    }

    button {
        text-align: center;
        color: white;
        background-color: var(--grape-green);
        font-size: 1.1em;
        border-radius: 4px;
        padding: 8px;
        display: inline-block;
        cursor: pointer;
        margin: 8px;
        transition: background-color 200ms;
    }
    tab {
        text-align: center;
        color: black;
        font-size: 1.1em;
        padding: 4px;
        display: inline-block;
        cursor: pointer;
        margin: 4px;
        border-radius: 4px;
        
        transition: background-color 200ms;
        background-color: #00000000;
    }

    tab:hover {
        background-color: #00000033;
    }

    .active-tab {
        background-color: #00000044;
    }
    .active-tab:hover {
        background-color: #00000077;
    }
    
    .school-action {
        background-color: #00AA00FF;
    }
    .school-action:hover {
        background-color: #006600FF;
    }
    .business-action {
        background-color: #AAAA00FF;
    }
    .business-action:hover {
        background-color: #666600FF;
    }
    .end-action {
        background-color: #AA0000FF;
    }
    .end-action:hover {
        background-color: #660000FF;
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
        z-index: 9;
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
        font-size: 1.2em;
        margin-bottom: 12px;
    }

    faint {
        opacity: 0.7;
    }

    editor {
        background-color: white;
        width: 250px;
        height: 150px;
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

    big-button {
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
    }

    input {
        font-size: 20px;
        width: 100px;
    }
</style>

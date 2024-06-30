<script lang="ts">
    import Logo from "$lib/components/Logo.svelte";
    import { commatizeNumber, toCleanStamp, redGreenLerp} from "$lib/util";

    export let data;

    let date = new Date();
    let reportElement: HTMLElement;

    let showCampaigns = true;
    let showDonations = true;
    let showNegotiations = true;
    let monochrome = false;

    const KNegotiationStage = [
        "Interest Indicated",
        "Proposal Made",
        "Amount Proposed (School)",
        "Amount Proposed (Business)",
        "Amount Refused (School)",
        "Amount Refused (Business)",
        "Amount Accepted",
        "Payment Made",
    ];

    function printElement(element: HTMLElement) {
        // Well ain't that annoying!
        for (const el of document.querySelectorAll("printable")) {
            el.classList.remove("printable");
        }

        element.classList.add("printable");
        while (element.parentElement) {
            element.classList.add("printable-ancestor");
            element = element.parentElement;
        }

        window.print();
    }

    function getUnsecuredFunds() {
        return data.campaigns.map(x => x.money_needed - x.money_donated).reduce((a, x) => a + x);
    }
</script>

<split>

<report bind:this={reportElement} class:mono={monochrome}>
    <top-bar>
        <Logo />
        <info>
            Report generated
            <b>{date.toLocaleString()}</b>
            by <b>{data.user.firstName} {data.user.lastName}</b>.
        </info>
    </top-bar>
    <hr>

    {#if showCampaigns}
        <r-content>
            <h2>Campaigns</h2>
<table>
    <thead>
        <tr>
        <th scope="col">Campaign</th>
        <th scope="col">Funds Donated</th>
        <th scope="col">Fund Target</th>
        <th scope="col">Deadline</th>
        </tr>
    </thead>
    <tbody>
        {#each data.campaigns as c}
            <tr>
                <td style="text-align: center;">{c.title}</td>
                <td
                    class="money"
                    style={"color:"+redGreenLerp(c.money_donated / c.money_needed, 0.65)}
                    >
                    ${commatizeNumber(c.money_donated)} ({(c.money_donated / c.money_needed*100).toFixed(1)}%)
                </td>
                <td class="money">${commatizeNumber(c.money_needed)}</td>
                <td>{toCleanStamp(c.deadline)}</td>
            </tr>
        {/each}
    </tbody>
    <tfoot>
        <tr>
            <th scope="row" colspan="2">Unsecured Funds</th>
            <td class="money" style="font-weight:bold;color:crimson;">${commatizeNumber(getUnsecuredFunds())}</td>
            <td></td>
        </tr>
    </tfoot>
</table>
        </r-content>
    {/if}

    {#if showDonations}
        <r-content>
            <h2>Donations</h2>
<table>
    <thead>
        <tr>
        <th scope="col">Donor Org</th>
        <th scope="col">Agent</th>
        <th scope="col">Amount (USD)</th>
        <th scope="col">Date</th>
        <th scope="col">Reason</th>
        </tr>
    </thead>
    <tbody>
        {#each data.recentDonations as d}
            <tr>
                <td style="text-align: center;">{d.org?.name}</td>
                <td style="text-align: center;">{d.contact?.name}</td>
                <td class="money">${commatizeNumber(d.amountUsd)}</td>
                <td>{toCleanStamp(d.time)}</td>
                <td style="text-align: center;" class:faint={!d.reason}>{d.reason ?? "N/A"}</td>
            </tr>
        {/each}
    </tbody>
    <tfoot>
        <tr>
            <th scope="row" colspan="2">Cumulative Donations</th>
            <td class="money">${commatizeNumber(data.recentDonations.map(x => x.amountUsd).reduce((a, x) => a + x))}</td>
            <td></td>
            <td></td>
        </tr>
    </tfoot>
</table>
        </r-content>
    {/if}

    {#if showNegotiations}
        <r-content>
            <h2>Negotiations</h2>
<table>
    <thead>
        <tr>
        <th scope="col">Donor Org</th>
        <th scope="col">Agent</th>
        <th scope="col">Donation Stage</th>
        <th scope="col">Amount (USD)</th>
        <th scope="col">Start Date</th>
        <th scope="col">Last Action Date</th>
        <th scope="col">Reason</th>
        </tr>
    </thead>
    <tbody>
        {#each data.ongoingNegotiations as n}
            <tr>
                <td style="text-align: center;">{n.org.name}</td>
                <td style="text-align: center;">{n.contact.name}</td>
                <td style="text-align: center;">{KNegotiationStage[n.donation_stage]}</td>
                <td
                    class:money={!!n.amountUsd}
                    class:faint={!n.amountUsd}
                >
                    {n.amountUsd ? "$" + commatizeNumber(n.amountUsd) : "N/A"}
                </td>
                <td>{toCleanStamp(n.time_started)}</td>
                <td>{toCleanStamp(n.time_last_action)}</td>
                <td style="text-align: center;" class:faint={!n.reason}>{n.reason ?? "N/A"}</td>
            </tr>
        {/each}
    </tbody>
</table>
        </r-content>
    {/if}
</report>

<config>
    <box-label>Report Configuration</box-label>

    <config-options>
        <sect>Visualization</sect>
        <hr>

        <row>
            <label for="show-campaigns">Show Campaigns</label>
            <input id="show-campaigns" type="checkbox" bind:checked={showCampaigns}>
        </row>
        <row>
            <label for="show-donations">Show Donations</label>
            <input id="show-donations" type="checkbox" bind:checked={showDonations}>
        </row>
        <row>
            <label for="show-negotiations">Show Negotiations</label>
            <input id="show-negotiations" type="checkbox" bind:checked={showNegotiations}>
        </row>
        <row>
            <label for="bw-page">B/W Webpage</label>
            <input id="bw-page" type="checkbox" bind:checked={monochrome}>
        </row>

    </config-options>

    <print-button on:click={() => printElement(reportElement)}>Print</print-button>
</config>

</split>

<style>
    split {
        display: flex;
        width: calc(100% - 32px);
        height: 100%;
        font-family: sans-serif;
        gap: 12px;

        margin-left: 16px;
        margin-right: 16px;
    }

    report {
        flex-grow: 1;
        background-color: white;
        overflow-y: auto;
    }

    :global(report logo-container) {
        display: inline-flex !important;
        margin-left: 0px !important;
    }

    :global(report logo-container h1) {
        color: #660077;
        margin: 0px;
    }

    config {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 400px;
        border: 2px solid gray;
        border-radius: 8px;
        background-color: #00000022;
        margin-top: 6px;
        margin-bottom: 6px;
    }

    config-options {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 8px;
        flex-grow: 1;
    }

    config-options hr {
        width: 95%;
    }

    sect {
        display: block;
        font-weight: bold;
        text-align: center;
        font-size: 1.2em;
    }


    row {
        user-select: none;
        width: 95%;
        display: flex;
        justify-content: space-between;
        font-weight: bold;
        margin-bottom: 4px;
        background-color: transparent;
        transition: background-color 200ms;
        padding: 4px;
        border-radius: 4px;
    }

    row:hover {
        background-color: #00000022;
    }

    row label {
        flex-grow: 1;
    }

    print-button {
        color: white;
        background-color: var(--grape-green);
        width: calc(100% - 24px);
        height: 128px;
        margin: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 48px;
        font-weight: bold;
        border-radius: 8px;
        cursor: pointer;
    
        transition: filter 100ms, background-color 100ms;
    }

    print-button:hover {
        filter: drop-shadow(0 0 2px black);
        background-color: #279727;
    }

    box-label {
        display: block;
        width: 100%;
        text-align: center;
        font-weight: bold;

        background-color: #00000022;
        padding-top: 12px;
        padding-bottom: 12px;
    }

    top-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px;
    }

    report hr {
        margin: 10px 6px;
        border-color: #000000aa;
    }


    @media print {
        :global(body *:not(.printable-ancestor, .printable *)) {
            display: none !important;
        }
    }

    r-content {
        display: block;
        margin: 12px;
    }

    r-content h2 {
        margin: 0px;
        margin-bottom: 18px;
    }

    c-cont {
        display: flex;
        flex-direction: column;
        border-radius: 8px;
        margin: 12px;
    }

    table {
        border-collapse:collapse;
        background-color: #00000022;
        border-spacing: 50px 0;
        padding-left: 8px;
        padding-right: 8px;
        width: 100%;
    }

    thead {
        border-bottom: 1px solid black;
    }

    tfoot {
        border-top: 1px solid black;
    }

    tr:nth-child(odd) {
        background-color: #00000033;
    }

    td, th {
        padding-left: 4px;
        padding-right: 20px;
        text-align: center;
    }

    .money {
        color: green;
        font-weight: bold;
        text-align: center;
        -webkit-text-stroke: 0.2px black;
    }

    .mono {
        filter: grayscale(1.0);
    }

    .faint {
        opacity: 0.5;
    }
</style>

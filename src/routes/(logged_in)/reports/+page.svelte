<script lang="ts">
    import Logo from "$lib/components/Logo.svelte";

    let date = new Date();
    let reportElement: HTMLElement;

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
</script>

<split>

<report bind:this={reportElement}>
    <top-bar>
        <Logo />
        <info>
            Report generated
            <b>{date.toLocaleString()}</b>
            by <b>Gavin</b>.
        </info>
    </top-bar>
    <hr>
    <r-content>
        <h2>Campaigns</h2>
        <p>
            this is where id putmy report...................IF I HAD ONE!!!!!!!!!!111
        </p>
    </r-content>
</report>

<config>
    <box-label>Report Configuration</box-label>

    <config-options>
        <sect>Visualization</sect>
        <hr>

        <row>
            <label for="show-campaigns">Show Campaigns</label>
            <input id="show-campaigns" type="checkbox" checked>
        </row>
        <row>
            <label for="show-donations">Show Donations</label>
            <input id="show-donations" type="checkbox" checked>
        </row>
        <row>
            <label for="show-negotiations">Show Negotiations</label>
            <input id="show-negotiations" type="checkbox" checked>
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
    }

    :global(report logo-container) {
        display: inline-flex !important;
        margin-left: 0px !important;
    }

    :global(report logo-container h1) {
        color: var(--grape-green);
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
    }
</style>

<script lang="ts">
    import SearchBar from "./components/SearchBar.svelte"
</script>

<cont><greeting>Hello, Nicholas</greeting></cont>
<SearchBar />

<boxes>
    <labeled-box id="recent-activity">
        <box-label>Recent Activity</box-label>
        <box-content>
            Blah blah blah. I am a BOX.
        </box-content>
    </labeled-box>

    <labeled-box id="donors">
        <box-label>Potential Donors</box-label>
        <box-content>
            HELLLLLLLLLLLLLLLLO I AM A BOX.
        </box-content>
    </labeled-box>

    <labeled-box id="negotation">
        <box-label>Potential Donors</box-label>
        <box-content>
            HELLLLLLLLLLLLLLLLO I AM A BOX.
        </box-content>
    </labeled-box>
</boxes>

<style>
    cont {
        width: 100%;
    }

    greeting {
        float: left;
        font-weight: bold;
        font-size: 37px;
        margin-left: 10%;
        margin-top: 28px;
        margin-bottom: 28px;
    }

    labeled-box {
        border: 2px solid gray;
        border-radius: 8px;
        background-color: #00000022;
        margin-top: 6px;
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

    box-content {
        margin: 12px;
    }

    boxes {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        grid-auto-rows: minmax(100px, auto);
        width: 80%;
    }

    #donors {
        grid-column: 2;
        grid-row: 1 / 3;
    }
</style>

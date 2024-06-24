<script lang="ts">
    import SearchBar from "$lib/components/SearchBar.svelte"
    import Donation from "$lib/components/Donation.svelte"
    import DonationInProgress from "$lib/components/DonationInProgress.svelte";
    
    export let data;
    
    data.recentDonations.sort((a, b) => b.time-a.time);
</script>

<cont><greeting>Hello, {data.user.firstName}.</greeting></cont>
<SearchBar />


<boxes>
    <labeled-box id="recent-activity">
        <box-label>Recent Activity</box-label>
        <box-content class="dono-cont">
            <div class="scroll">
                {#each data.recentDonations as donation}
                    <Donation {donation} />
                {/each}
            </div>
        </box-content>
    </labeled-box>

    <labeled-box id="negotation">
        <box-label>Ongoing Negotiations</box-label>
        <box-content>
            <div class="scroll">
                {#each data.ongoingNegotiations as donation}
                    <DonationInProgress {donation} />
                {/each}
            </div>
        </box-content>
    </labeled-box>

    <labeled-box id="donors">
        <box-label>Potential Donors</box-label>
        <box-content>
            Cannot be done without donations.
        </box-content>
    </labeled-box>

    <labeled-box id="deadlines">
        <box-label>Campaign Deadlines</box-label>
        <box-content>
            Campaigns don't have deadlines.
        </box-content>
    </labeled-box>

    <labeled-box id="student-activity">
        <box-label>Student Activity</box-label>
        <box-content>
            And where are the students?
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
        padding: 12px;
    }

    .dono-cont {
        padding: 0px;
    }

    .scroll {
        height:250px;
        overflow-y:scroll;
    }

    boxes {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        grid-auto-rows: minmax(100px, auto);
        width: 80%;
        flex-grow: 1;
        margin-bottom: 12px;
    }

    #recent-activity {
        grid-column: 1;
        grid-row: 1 / 3;
    }
    #negotation {
        grid-column: 1;
        grid-row: 3 / 5;
    }
    #donors {
        grid-column: 2;
        grid-row: 1 / 4;
    }
    #deadlines {
        grid-column: 2;
        grid-row: 4 / 7;
    }
    #student-activity {
        grid-column: 1;
        grid-row: 5 / 7;
    }
</style>

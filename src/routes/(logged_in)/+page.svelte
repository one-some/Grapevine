<script lang="ts">
    import SearchBar from "$lib/components/SearchBar.svelte"
    import Donation from "$lib/components/Donation.svelte"
    import DonationInProgress from "$lib/components/DonationInProgress.svelte";
    import PotentialDonor from "$lib/components/PotentialDonor.svelte";
    import CampaignMini from "$lib/components/CampaignMini.svelte";
    
    export let data;
    
    data.recentDonations.sort((a, b) => b.time-a.time);
    data.organizations.sort((a, b) => (b.potentialStatus-a.potentialStatus || b.potentialDonation-a.potentialDonation));
    data.campaigns.sort((a, b) => (b.money_per_day-a.money_per_day));
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
            <div class="scroll">
                {#each data.organizations as org}
                    <PotentialDonor {org} />
                {/each}
            </div>
        </box-content>
    </labeled-box>

    <labeled-box id="deadlines">
        <box-label>Campaign Deadlines</box-label>
        <box-content>
            <div class="scroll">
                {#each data.campaigns as campaign}
                    <CampaignMini {campaign} />
                {/each}
            </div>
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
        height: 293px;
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
        padding: 0px;
    }

    .scroll {
        height: 250px;
        overflow-y:scroll;
        margin-top: 0px;
        margin-bottom: 0px;
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
        grid-row: 1 / 3;
    }
    #deadlines {
        grid-column: 2;
        grid-row: 3 / 5;
    }
</style>

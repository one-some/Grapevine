<script lang="ts">
    import IconBox from "virtual:icons/mdi/box-variant";

    import type { Campaign } from "../db.server";
    import { commatizeNumber } from "$lib/util";
    import IconShop from "virtual:icons/mdi/shop";

    export let campaign: Campaign;
</script>

<a href={"/campaigns/"+campaign.title} class="all">
    <campaign>
        <chunk class="top">
            <time>{new Date(campaign.deadline * 1000).toDateString().split(" ").slice(1, 4).join(" ")}</time>
            <sep>―</sep>
            <campaign-title>
                <IconBox />
                <a href="/campaigns/{campaign.title}">{campaign.title}</a>
            </campaign-title>
            <dollars>${commatizeNumber(campaign.money_donated)}</dollars>
            <txt>/</txt>
            <dollars>${commatizeNumber(campaign.money_needed)}</dollars>
        </chunk>
        <chunk class="bottom">
            <dollars>{campaign.days_left} Days</dollars>
            <txt>left:</txt>
            <dollars>${commatizeNumber(campaign.money_per_day)}</dollars>
            <txt>per day to reach goal.</txt>
        </chunk>
    </campaign>
</a>

<style>
    .all {
        text-decoration: none;
        color: black;
    }

    campaign {
        padding: 12px;
        display: block;
        background-color: #00000010;
        transition: background-color 200ms;
    }

    campaign:hover {
        background-color: #ffffff20;
    }

    chunk {
        display: block;
    }
    

    sep {
        user-select: none;
        display: inline-block;
        opacity: 0.5;
        font-weight: bold;
    }

    txt {
        user-select: none;
    }

    campaign-title {
        position: relative;
        top: 4px;

        display: inline-flex;
        gap: 2px;
        align-items: center;

        font-weight: bold;
    }

    dollars {
        color: darkgreen;
        font-weight: bold;
    }
    
    time {
        font-weight: bold;
        font-size: 0.9em;
        display: inline-block;
    }

    .top {
        margin-bottom: 0px;
        padding-bottom: 2px;
    }
    .bottom {
        margin-top: 0px;
        padding-top: 2px;
    }
</style>
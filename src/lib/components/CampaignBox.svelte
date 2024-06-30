<script lang="ts">
    export let title, desc, money_donated, money_needed, deadline, id;
    import { commatizeNumber, toCleanStamp, redGreenLerp } from "$lib/util";
</script>

<a href="campaigns/{id}" id="campaign-entry">
    <h1>
        {title}
    </h1>
    <h2 id="date">
        Deadline:
        <time>{toCleanStamp(deadline)}</time>
    </h2>
    <h2>
        {desc}
    </h2>
    <h1 id="fraction">
        ${commatizeNumber(money_donated)} / ${commatizeNumber(money_needed)}
    </h1>
    <div id="progress-bar">
        <div
            id="bar-progress"
            style={"background-color:"+redGreenLerp(money_donated / money_needed, 0.8)}
        ></div>
    </div>
</a>
<style>

    #campaign-entry:hover{
        filter:brightness(80%);
    }

    #progress-bar {
        background-color: grey;
        height: 30px;
    /*width: calc(100% - 32px);*/
        width: 50%;
        align-self: center;
        border-radius: 15px;
        margin-bottom: 10px;
    }

    #fraction {
        color: green;
        display: block;
    }

    #bar-progress {
        background-color: var(--grape-green);
        width: var(--progress);
        height: 30px;
        border-radius: 15px;
    }

    #campaign-entry {
        background-color: white;
        width: calc(100% - 16px);
        margin-bottom: 10px;
    }

    #campaign-entry > * {
        margin-left: 10px;
    }

    h2 {
        color: grey;
        font-size: 15px;
    }
    a:link { 
        text-decoration: none; 
    } 
    a:visited { 
        text-decoration: none; 
    } 
    a:hover { 
        text-decoration: none; 
    } 
    a:active { 
        text-decoration: none; 
    }

    #date {
        font-weight: bold;
    }
    time {
        color: black;
        font-weight: bold;
    }

</style>

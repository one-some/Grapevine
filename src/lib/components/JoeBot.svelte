<script lang="ts">
    import IconChatQuestion from "virtual:icons/mdi/chat-question";
    import IconCloseThick from "virtual:icons/mdi/close-thick";

    let shown = false;
</script>

<joe-bot>
    {#if shown}
        <dm>
            <bar>
                <padding />
                <center-bit>
                    <IconChatQuestion class="ch-icon" />
                    Help Chat
                </center-bit>
                <close on:click={() => shown = false}>
                    <IconCloseThick class="ch-icon" />
                </close>
            </bar>
            <msg-cont>
                yo im joe
            </msg-cont>
        </dm>
    {:else}
        <help-icon on:click={() => shown = true}>
            <IconChatQuestion />
        </help-icon>
    {/if}
</joe-bot>

<style>
    joe-bot {
        z-index: 9;
        font-family: sans-serif;
        position: absolute;
        bottom: 0px;
        right: 0px;
    }

    /* HACK: Global is needed here to address the internal elements of icons... not lovely but whatever */
    :global(.ch-icon) {
        position: relative;
        /* Manual position correction instead of flexbox or something
           to ensure unifomity across containers */
        top: 4px;
    }

    dm {
        display: flex;
        width: 350px;
        flex-direction: column;
    }

    bar {
        display: flex;
        justify-content: space-between;
        align-content: center;
        /* Darker? */
        background-color: var(--accent0);
        padding: 4px;
        color: white;
        font-weight: bold;
        user-select: none;

        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }

    close {
        cursor: pointer;
        padding-right: 4px;
    }

    msg-cont {
        display: block;
        background-color: white;
        height: 500px;
    }

    help-icon {
        display: flex;

        justify-content: center;
        align-items: center;

        width: 48px;
        height: 48px;

        margin: 8px;

        border: 4px solid #aaaaaa;
        border-radius: 128px;
        background-color: #cccccc;
        cursor: pointer;
    }
    
    :global(help-icon svg) {
        width: 80%;
        height: 80%;
    }
</style>

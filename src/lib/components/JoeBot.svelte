<script lang="ts">
    import IconChatQuestion from "virtual:icons/mdi/chat-question";
    import IconCloseThick from "virtual:icons/mdi/close-thick";
    import IconSend from "virtual:icons/mdi/send";

    enum MessageAuthor {
        JOE = "joe",
        USER = "user",
    };

    interface ChatMessage {
        author: MessageAuthor;
        message: string;
    };

    let inputBox: HTMLInputElement;
    let msgCont: HTMLDivElement;
    let shown = false;
    let thinking = false;
    $: if (inputBox) inputBox.disabled = thinking;

    let messages: ChatMessage[] = [
        {author: MessageAuthor.JOE, message: "Hello! My name is Joe and I'm here to help you with Grapevine. How can I assist you today?"}
    ];

    function inputKeydown(event) {
        if (event.key !== "Enter") return;
        send();
    }
    
    function addMessage(message) {
        messages = [...messages, message];
        setTimeout(function() {
            // Probably Firefox exclusive hack because their event system is somewhat
            // scuffed but WHATEVER!
            inputBox.focus();

            // HACK! it doesnt work right away from reactivity.
            Array.from(msgCont.children).at(-1).scrollIntoView()
        }, 100);
    }

    function send() {
        const message = inputBox.value.trim();

        if (!message) return;
        inputBox.value = "";

        // Seriously annoying Svelte behavior. Reactivity is only triggered in the
        // case of an assignment, so Array.push/Array.pop silently doesn't work....
        // GAAAAAAAaH!!!!!?!??????!?!?!?!?
        // And they act like this is normal or intuative in any way:
        //      https://learn.svelte.dev/tutorial/updating-arrays-and-objects
        addMessage({author: MessageAuthor.USER, message: message});

        thinking = true;
        setTimeout(reply, 1000 + (Math.random() * 300));
    }

    function getResponse(query: string): string {
        if (query.includes("account")) {
            return `Account management can be performed under the account management section. For more details, <a href="/help#manage_account">see the documentation</a>.`
        }
        return "I'm sorry, I don't understand your request. Try asking a question like \"how do I manage an account?\"";
    }

    function reply() {
        const query = messages.at(-1).message.toLowerCase();
        const response = getResponse(query);
        addMessage({author: MessageAuthor.JOE, message: response});
        thinking = false;
    }

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
            <msg-cont bind:this={msgCont}>
                <tutorial>In this window, you can ask Joe, our intelligent chatbot, any question you might have regarding the use of Grapevine.</tutorial>
                {#each messages as message}
                    <msg-wrapper author="{message.author}"><msg>{@html message.message}</msg></msg-wrapper>
                {/each}

                {#if thinking}
                    <msg-wrapper author="joe"><msg>
                        <loading />
                    </msg></msg-wrapper>
                {/if}
            </msg-cont>
            <input-bar>
                <input bind:this={inputBox} on:keydown={inputKeydown} />
                <send-icon on:click={send}>
                    <IconSend />
                </send-icon>
            </input-bar>
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

        filter: drop-shadow(0 0 5px black);
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

        border-bottom: 3px solid #00000011;

        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }

    close {
        cursor: pointer;
        padding-right: 4px;
    }

    msg-cont {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 4px;
        padding-bottom: 8px;

        overflow-y: auto;
        background-color: white;
        height: 500px;
    }

    tutorial {
        font-size: 0.85em;
        opacity: 0.4;
        text-align: center;
        user-select: none;
    }
    
    msg-wrapper {
        display: flex;
    }

    msg {
        display: block;
        border-radius: 8px;
        background-color: white;
        padding: 10px;
        border: 2px solid #00000058;
        animation: fadein 200ms;
    }

    msg-wrapper[author="user"] {
        justify-content: end;
    }
    
    msg-wrapper[author="joe"] msg {
        background-color: #0000ff40;
    }

    input-bar {
        display: flex;
        align-items: center;

        background-color: white;

        border-top: 2px solid #00000044;
    }

    input-bar input {
        font-size: 1.1em;
        padding: 8px;
        border: none;
        outline: none;
        flex-grow: 1;
    }

    send-icon {
        display: flex;
        align-items: center;
        width: 24px;
        padding: 4px;
        cursor: pointer;
    }


    :global(send-icon:hover svg) {
        opacity: 0.6;
    }

    :global(send-icon svg) {
        width: 100%;
        height: 100%;
        opacity: 0.4;
        transition: opacity 300ms;
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

    /* Loader adapted from https://css-loaders.com/dots/ */
    loading {
        display: block;
        opacity: 0.6;

        margin-left: 20px;
        margin-right: 20px;

        width: 15px;
        aspect-ratio: 1;
        border-radius: 50%;
        animation: load 1s infinite linear alternate;
    }
    @keyframes load {
        0%  {box-shadow: 20px 0 #000, -20px 0 #0002;background: #000; }
        33% {box-shadow: 20px 0 #000, -20px 0 #0002;background: #0002; }
        66% {box-shadow: 20px 0 #0002,-20px 0 #000; background: #0002; }
        100%{box-shadow: 20px 0 #0002,-20px 0 #000; background: #000;  }
    }

    @keyframes fadein {
        from { opacity: 0; }
        to { opacity:1; }
    }
</style>

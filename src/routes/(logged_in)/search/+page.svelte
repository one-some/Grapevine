<script lang="ts">
    import SearchBar from "$lib/components/SearchBar.svelte"

    import PartnerCard from "$lib/components/PartnerCard.svelte"

    import type { PageData } from "../$types";
    import { onMount } from "svelte";
    import type { Organization } from "$lib/db.server";
    
    export let data: PageData;
    let searchResults: Organization[];
    $: searchResults = [];
    let modalBind: HTMLElement;
    let modalHidden: boolean = true;
    let searchParams = {name: "", sort: "name_desc"};
    let searchQuery: string;

    async function updateSearchResults() {
        // TODO: Pretty sure theres a native JS interface for this
        let paramParts = [];
        for (const [k, v] of Object.entries(searchParams)) {
            if (!v && v !== 0) continue;

            paramParts.push(`${k}=${v}`);
        }

        let paramString = "";
        if (paramParts.length) paramString = "?" + paramParts.join("&");

        const request = await fetch(`/api/search.json${paramString}`);
        const j = await request.json();

        searchResults = [...j.results];
    }

    function onSearch(query, sort) {
        searchParams.name = query;
        searchParams.sort = sort;
        updateSearchResults();
    }

    function clickDismiss(event: PointerEvent) {
        if (event.target !== modalBind) return;
        modalHidden = true;
    }

    onMount(() => {
        updateSearchResults();
        document.body.appendChild(modalBind);
    });
</script>

<SearchBar {onSearch}/>
<big-button id="new-button" on:click={() => modalHidden = false}>Add Partner</big-button>

{#each searchResults as result}
    <PartnerCard partner={result}/>
{/each}

{#if !searchResults.length}
    No results.
{/if}

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<modal bind:this={modalBind} class:hidden={modalHidden} on:click={clickDismiss}>
    <editor>
        <modal-label>Edit Contact</modal-label>
        <content>
            <block-cont>
                <input id="name" placeholder="New Partner" />
            <!-- </block-cont>
            <block-cont>
                <faint>a new</faint>
                <select>
                    <option>Non-Profit</option>
                    <option>For-Profit</option>
                </select>
                <faint>business partner</faint>
            </block-cont>
            <block-cont>
                <faint>stationed in</faint>
                <input id="place" value="Lafayette" placeholder="City">,
                <select>
                    <option>Louisiana</option>
                    <option>Alabama</option>
                    <option>Alaska</option>
                    <option>Arizona</option>
                    <option>Arkansas</option>
                    <option>California</option>
                    <option>Colorado</option>
                    <option>Connecticut</option>
                    <option>Delaware</option>
                    <option>Florida</option>
                    <option>Georgia</option>
                    <option>Hawaii</option>
                    <option>Idaho</option>
                    <option>Illinois</option>
                    <option>Indiana</option>
                    <option>Iowa</option>
                    <option>Kansas</option>
                    <option>Kentucky</option>
                    <option>Maine</option>
                    <option>Maryland</option>
                    <option>Massachusetts</option>
                    <option>Michigan</option>
                    <option>Minnesota</option>
                    <option>Mississippi</option>
                    <option>Missouri</option>
                    <option>Montana</option>
                    <option>Nebraska</option>
                    <option>Nevada</option>
                    <option>New Hampshire</option>
                    <option>New Jersey</option>
                    <option>New Mexico</option>
                    <option>New York</option>
                    <option>North Carolina</option>
                    <option>North Dakota</option>
                    <option>Ohio</option>
                    <option>Oklahoma</option>
                    <option>Oregon</option>
                    <option>Pennsylvania</option>
                    <option>Rhode Island</option>
                    <option>South Carolina</option>
                    <option>South Dakota</option>
                    <option>Tennessee</option>
                    <option>Texas</option>
                    <option>Utah</option>
                    <option>Vermont</option>
                    <option>Virginia</option>
                    <option>Washington</option>
                    <option>West Virginia</option>
                    <option>Wisconsin</option>
                    <option>Wyoming</option>
            </block-cont>
            <block-cont>
                <faint>with a company size of</faint>
                <input id="company_size" type="number" value=0 placeholder="Employees">
                <faint>employees</faint>
            </block-cont>
            <block-cont>
                <faint>
                    and an annual profit of
                </faint>
                $<input id="annual_profit" type="number" value=0 placeholder="Profit">
            </block-cont>
            <block-cont>
                <faint>
                    which can be briefly described by the following:
                </faint>
            </block-cont>
            <block-cont>
                <input id="desc" type="text">
            </block-cont> -->
            <block-cont>
                <faint>Company Type:</faint>
                <select>
                    <option>Non-Profit</option>
                    <option>For-Profit</option>
                </select>
            </block-cont>
            <block-cont>
                <faint>Location:</faint>
                <input id="place" value="Lafayette" placeholder="City">,
                <select>
                    <option>Louisiana</option>
                    <option>Alabama</option>
                    <option>Alaska</option>
                    <option>Arizona</option>
                    <option>Arkansas</option>
                    <option>California</option>
                    <option>Colorado</option>
                    <option>Connecticut</option>
                    <option>Delaware</option>
                    <option>Florida</option>
                    <option>Georgia</option>
                    <option>Hawaii</option>
                    <option>Idaho</option>
                    <option>Illinois</option>
                    <option>Indiana</option>
                    <option>Iowa</option>
                    <option>Kansas</option>
                    <option>Kentucky</option>
                    <option>Maine</option>
                    <option>Maryland</option>
                    <option>Massachusetts</option>
                    <option>Michigan</option>
                    <option>Minnesota</option>
                    <option>Mississippi</option>
                    <option>Missouri</option>
                    <option>Montana</option>
                    <option>Nebraska</option>
                    <option>Nevada</option>
                    <option>New Hampshire</option>
                    <option>New Jersey</option>
                    <option>New Mexico</option>
                    <option>New York</option>
                    <option>North Carolina</option>
                    <option>North Dakota</option>
                    <option>Ohio</option>
                    <option>Oklahoma</option>
                    <option>Oregon</option>
                    <option>Pennsylvania</option>
                    <option>Rhode Island</option>
                    <option>South Carolina</option>
                    <option>South Dakota</option>
                    <option>Tennessee</option>
                    <option>Texas</option>
                    <option>Utah</option>
                    <option>Vermont</option>
                    <option>Virginia</option>
                    <option>Washington</option>
                    <option>West Virginia</option>
                    <option>Wisconsin</option>
                    <option>Wyoming</option>
            </block-cont>
            <block-cont>
                <faint>Company Size:</faint>
                <input id="company_size" type="number" value=0 placeholder="Employees">
                <faint>Employees</faint>
            </block-cont>
            <block-cont>
                <faint>
                    Annual Profit:
                </faint>
                $<input id="annual_profit" type="number" value=0 placeholder="Profit">
            </block-cont>
            <block-cont>
                <faint>
                    Brief Description:
                </faint>
            </block-cont>
            <block-cont>
                <textarea id="desc"></textarea>
            </block-cont>
        </content>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <big-button on:click={() => modalHidden = true}>Save</big-button>
    </editor>
</modal>

<style>
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
    }

    faint {
        opacity: 0.7;
        font-size: 16px;
    }

    block-cont {
        font-size: 1.2em;
        margin-bottom: 12px;
    }

    editor {
        background-color: white;
        width: 40%;
        height: 80%;
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

    modal-label.error {

    }

    #name {
        font-size: 1.7em;
        border: none;
        border-bottom: 2px solid gray;
        outline: none;
        margin-bottom: 12px;
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

    #new-button {
        width: 25%;
    }

    #desc {
        width: 100%;
    }

    input, textarea, select {
        font-size: 16px;
    }
    textarea {
        resize: none;
        height: 75px;
        font-family: sans-serif;
    }
</style>

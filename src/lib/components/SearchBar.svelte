<script lang="ts">
    interface Suggestion {
        name: string;
    }

    let suggestions: Suggestion[] = [];

    let focused: boolean = false;
    let searchQuery: string;
    let sortChoice: HTMLSelectElement;
    export let onSearch = function(query, sort) {};

    async function fetchSuggestions() {
        /* Fetches suggestions from the reactive string searchQuery */

        // Fast fail if there is no search query.
        if (!searchQuery) {
            suggestions = [];
            return;
        }

        const r = await fetch(`/api/search.json?name=${searchQuery}`);

        // Gracefully fail in case of backend error
        if (!r.ok) {
            console.error("Request returned bad response code.");
            return;
        }

        // Suggestions is reactive and creates suggestions in the
        // searchbar component
        const j = await r.json();
        suggestions = [];

        let ttl = 5;

        for (const result of j.results) {
            suggestions.push({name: result.name});
            ttl--;
            if (!ttl) break;
        }
    }

    function doSearch() {
        onSearch(searchQuery, sortChoice.value);
    }

    function keyDown(event) {
        if (event.key !== "Enter") return;
        doSearch();
        focused = false;
    }
</script>

<searchbar
    on:click={() => focused = true}
>
    <input
        bind:value={searchQuery}
        on:input={() => fetchSuggestions()}
        on:keydown={keyDown}
        placeholder="Search your network..."
    >

    {#if focused}
        <option-box>
            <option-header>Advanced Options</option-header>
            <option-block>
                <label>Company Type</label>
                <select>
                    <option>For-Profit</option>
                    <option>Non-Profit</option>
                </select>
            </option-block>
            <option-block>
                <label>Sort by</label>
                <select bind:this={sortChoice} on:change={doSearch}>
                    <option value="name_desc">Name (Desc.)</option>
                    <option value="name_asc">Name (Asc.)</option>
                    <option value="prior_contrib_desc">Prior Contribution (Desc.)</option>
                    <option value="prior_contrib_asc">Prior Contribution (Asc.)</option>
                    <option value="last_contrib_desc">Last Contribution Date (Desc.)</option>
                    <option value="last_contrib_asc">Last Contribution Date (Asc.)</option>
                    <option value="emp_count_desc">Employee Count (Desc.)</option>
                    <option value="emp_count_asc">Employee Count (Asc.)</option>
                </select>
            </option-block>
        </option-box>
        <suggestions>
            {#each suggestions as suggestion}
                <suggestion>
                    <name>{suggestion.name}</name>
                    <type>Company</type>
                </suggestion>
            {/each}
        </suggestions>
    {/if}
</searchbar>

<style>
    searchbar {
        display: inline-flex;
        flex-direction: column;
        align-items: center;

        width: 100%;
        max-width: 50%;
    }

    suggestions {
        display: inline-block;
        background-color: #F8F8F8;
        border-radius: 8px;

        border-top-left-radius: 0px;
        border-top-right-radius: 0px;
        border: 2px solid #00000066;
        border-top: none;

        width: 50%;
    }

    suggestion {
        display: block;
        padding: 8px;
        border-bottom: 2px solid #00000066;
    }

    suggestion:last-child {
        border-bottom: none;
    }

    suggestion name {
        display: block;
        font-weight: bold;
        /*font-size: 1.1em;*/
    }

    suggestion type {
        opacity: 0.7;
        /*font-size: 0.9em;*/
    }

    option-header {
        display: block;
        font-size: 1.3em;
        opacity: 0.6;
        font-weight: bold;
        margin-bottom: 6px;
    }

    option-box {
        display: inline-block;
        background-color: #F8F8F8;
        border-radius: 8px;

        border-top-left-radius: 0px;
        border-top-right-radius: 0px;
        border: 2px solid #00000066;
        border-top: none;

        padding: 8px;
        width: 50%;
    }

    option-block {
        display: block;
    }

    input {
        width: 100%;

        height: 32px;

        /* Fix vertical alignment */
        line-height: 32px;

        font-size: 16px;

        border-radius: 128px;
        
        /* Disable highlighting when focused */
        outline: none;

        padding-left: 16px;
        padding-right: 16px;

        padding-top: 4px;
        padding-bottom: 4px;

        border: 2px solid #00000066;
    }
</style>

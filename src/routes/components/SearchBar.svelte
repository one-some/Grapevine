<script lang="ts">
    interface Suggestion {
        name: string;
    }

    let suggestions: Suggestion[] = [];

    let focused: boolean = false;
    let searchQuery: string;

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

        for (const result of j.results) {
            suggestions.push({name: result.name});
        }
    }
</script>

<searchbar>
    <input
        bind:value={searchQuery}
        on:input={() => fetchSuggestions()}
        on:focus={() => focused = true}
        on:blur={() => focused = false}
        placeholder="Search your network..."
    >

    {#if focused}
        <option-box>
            <option-header>Advanced Options</option-header>
            <option-block>
                <label>Company Type</label>
                <select>
                    <option>Nonprofit</option>
                    <option>LLC</option>
                    <option>401K Invest</option>
                </select>
            </option-block>
            <option-block>
                <label>Sort by</label>
                <select>
                    <option>Prior Contribution (Desc.)</option>
                    <option>Prior Contribution (Asc.)</option>
                    <option>Name (Desc.)</option>
                    <option>Name (Asc.)</option>
                    <option>Last Contribution Date (Desc.)</option>
                    <option>Last Contribution Date (Asc.)</option>
                    <option>Employee Count (Desc.)</option>
                    <option>Employee Count (Asc.)</option>
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

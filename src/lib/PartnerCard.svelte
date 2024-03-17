<script lang="ts">
    import type { Organization } from "./db.server";

    export let partner: Organization;
</script>

<partner-card>
    <name>{partner.name}</name>
    <faint>Tags:</faint>
    <tag-collection>
        {#each partner.tags as tag}
            <tag>{tag}</tag>
        {/each}
    </tag-collection>
    <actions>
        <contact-button>
            Contact
        </contact-button>
    </actions>
</partner-card>

<style>
    partner-card {
        /* TODO: ??? */
        width: 530px;
        border: 2px solid gray;
        border-radius: 12px;
        padding: 4px;
        margin-top: 8px;
        background-color: #00000009;
    }

    name {
        display: block;
        font-weight: bold;
        font-size: 1.8em;
        margin-bottom: 4px;
    }

    faint {
        opacity: 0.6;
        font-style: italic;
    }

    tag {
        border-radius: 4px;
        color: #000000AA;
        background-color: #00000022;
        padding: 2px;
        display: inline-block;
        cursor: pointer;
    }

    actions {
        margin-top: 8px;
        display: flex;
    }

    actions > * {
        flex-grow: 1;
    }

    contact-button {
        text-align: center;
        color: white;
        background-color: #4ef04e;
        font-size: 1.1em;
        border-radius: 4px;
        padding: 8px;
        display: inline-block;
        cursor: pointer;
    }
</style>

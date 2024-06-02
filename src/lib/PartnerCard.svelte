<script lang="ts">
    import type { Organization } from "./db.server";

    const randCache = {};

    function randFor(name, min, max) {
        const ra = randCache[name] || Math.random();
        randCache[name] = ra;
        return Math.floor(((max-min) * ra) + min);
    }

    function commatize(n) {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    export let partner: Organization;
</script>

<a href="/orgs/{partner.name}" class="partner-card">
    <name>{partner.name}</name>
    <faint>{partner.desc}</faint>
    <faint>{partner.employeeCount} employees</faint>
    <faint>{["Non-Profit", "For-Profit"][partner.orgType]}</faint>
    <faint>${commatize(randFor(partner.name, 2400, 1200000))} USD for Q3</faint>
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
</a>

<style>
    .partner-card {
        display: block;
        text-decoration: none;
        color: black;

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
        display: block;
        margin-left: 8px;
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

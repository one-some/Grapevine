<script lang="ts">
    export let text;
    export let link = '/';
</script>

<a href={link} class="topbar-button">
    {text}
</a>

<style>
    .topbar-button {
        display: flex;
        text-decoration: none;

        cursor: pointer;

        color: white;
        font-size: 18px;
        font-weight: bold;

        justify-content: center;
        align-items: center;

        padding: 8px;
        padding-top: 16px;
        padding-bottom: 16px;

        transition: background-color 200ms;
        background-color: #00000000;
    }

    .topbar-button:hover {
        background-color: #00000088;
    }
</style>

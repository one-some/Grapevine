<script lang="ts">
    export let text;
</script>

<sidebar-button>
{text}
</sidebar-button>

<style>
    sidebar-button {
        display: flex;

        cursor: pointer;

        color: white;
        font-size: 18px;
        font-weight: bold;

        justify-content: center;
        align-items: center;

        padding: 8px;
        padding-top: 16px;
        padding-bottom: 16px;

        transition: background-color 0.2s;
        background-color: #00000033;
    }

    sidebar-button:hover {
        background-color: #000000AA;
    }
</style>

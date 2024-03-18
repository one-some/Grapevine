<script lang="ts">
    export let name, org_type, desc;
</script>
<a href="/orgs/{name}" id="contact-box">
    <h1>{name}</h1>
    <div id="contact-subtext">
        <h2>Type: {#if org_type == "FOR_PROFIT"}For Profit{:else}Non-Profit{/if}</h2>
        <h2>Description: {desc}</h2>   
    </div>
</a>

<style>
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
    h2{
        font-size: 15px;
    }

    h1 {
        margin-left: 10px;
        margin-bottom: 0px;
    }

    #contact-box {
        /* HACK: 100% - margin * 2 */
        width: calc(100% - 16px);
        padding: 5px;
        margin: 8px;

        background-color: white;
        border-color: black;
        border-width: 1px;
        display: block;
    }

    #contact-box:hover{
        filter:brightness(80%);
    }

    #contact-subtext {
        color: grey;
        display: block;
    }
</style>
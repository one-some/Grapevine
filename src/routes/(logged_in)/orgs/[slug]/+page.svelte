<script>
    import Peoples_contact_info from "../../../components/PeopleContactInfo.svelte";
    export let data;
    console.log(data);
</script>

<h1>{data.name}</h1>
<div id="org_data">
    <h2>Type: {#if data.contact.org_type == "FOR_PROFIT"}For Profit{:else}Non-Profit{/if}</h2>
    <h2>Description: {data.contact.desc}</h2>
    <h2>Number of Employees: {data.contact.employee_count}</h2>
</div>
<!-- <div id="previous-org-donations-list">
    
</div> -->

<div id="peoples_contact_info">
    <h3>People</h3>
    {#each data.people as info}
    <Peoples_contact_info name={info.first_name + " " + info.last_name} phone_number={info.phone} email={info.email} />
    <br>
    {/each}
</div>





<style>

    h3 {
        font-size: 30px;
    }

    #org_data {
        /* HACK: 100% - margin * 2 */
        width: calc(100% - 8px);
        padding: 5px;
        margin: 8px;

        background-color: white;
        border-color: black;
        border-width: 1px;
        display: block;
    }

    #previous-org-donations-list {
        width: calc(100% - 8px);
        padding: 5px;
        margin: 8px;

        background-color: white;
        border-color: black;
        border-width: 1px;
        display: block;
    }
</style>

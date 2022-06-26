<script>
    export let first_name, pref_name = "", middle_name, last_name, sex, age, birthday;

    function testAlert(){
        alert(`This swimmer is named ${first_name} ${last_name}`)
    }
</script>

<tr on:click={testAlert} style="cursor: pointer">
    <td>{pref_name || first_name}</td>
    <td>{middle_name}</td>
    <td>{last_name}</td>
    <td>{sex}</td>
    <td>{age}</td>
    <td>{birthday}</td>
</tr>
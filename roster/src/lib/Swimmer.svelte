<script>
    import { getContext } from 'svelte';
    import SwimmerDetail from './SwimmerDetail.svelte';

    const { open } = getContext('simple-modal');

    const showDetail = () => {
        open(SwimmerDetail, {
            first_name: first_name,
            pref_name: pref_name,
            middle_name: middle_name,
            last_name: last_name,
            sex: sex,
            birthday: birthday,
        });
    }

    export let first_name, pref_name = "", middle_name, last_name, sex, age, birthday;
</script>


<tr on:click={showDetail} style="cursor: pointer">
    <td>{pref_name || first_name}</td>
    <td>{last_name}</td>
    <td>{sex}</td>
    <td>{age}</td>
    <td>{birthday}</td>
</tr>
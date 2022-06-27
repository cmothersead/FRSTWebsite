<script>
    import { getContext } from 'svelte';
    import SwimmerDetail from './SwimmerDetail.svelte';

    const { open, close } = getContext('simple-modal');

    const showDetail = () => {
        open(SwimmerDetail, {
            pk: pk,
            first_name: first_name,
            pref_name: pref_name,
            middle_name: middle_name,
            last_name: last_name,
            sex: sex,
            birthday: birthday,
            close: close,
        });
    }

    export let pk, first_name, pref_name = "", middle_name, last_name, sex, age, birthday;
</script>


<tr on:click={showDetail} style="cursor: pointer">
    <td>{pref_name || first_name}</td>
    <td>{last_name}</td>
    <td>{sex}</td>
    <td>{age}</td>
    <td>{birthday}</td>
</tr>
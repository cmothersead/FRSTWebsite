<script>
    import { swimmers } from "./stores";


    export let pk, first_name, pref_name="", middle_name, last_name, sex, birthday, close;


    function updateSwimmer(){
        const index = $swimmers.findIndex(s => s.pk === pk);
        const storedSwimmer = $swimmers[index];
        const currentSwimmer = {};

        if(storedSwimmer.first_name !== first_name){
            console.log(`first_name updated to ${first_name}`);
            currentSwimmer.first_name = first_name;
        }
        if(storedSwimmer.pref_name !== pref_name){
            console.log(`pref_name updated to ${pref_name}`);
            currentSwimmer.pref_name = pref_name;
        }
        if(storedSwimmer.middle_name !== middle_name){
            console.log(`middle_name updated to ${middle_name}`);
            currentSwimmer.middle_name = middle_name;
        }
        if(storedSwimmer.last_name !== last_name){
            console.log(`last_name updated to ${last_name}`);
            currentSwimmer.last_name = last_name;
        }
        if(storedSwimmer.sex !== sex){
            console.log(`sex updated to ${sex}`);
            currentSwimmer.sex = sex;
        }
        if(storedSwimmer.birthday !== birthday){
            console.log(`birthday updated to ${birthday}`);
            currentSwimmer.birthday = birthday;
        }

        $swimmers[index] = { ...$swimmers[index], ...currentSwimmer};
        close();
    }

</script>

<h1>Swimmer Data</h1>
<div>
    <div class="row ">
        <div class="col">
            <label for="first_name">First</label>
            <input type="text" id="first_name" bind:value={first_name} class="form-control" placeholder="First">
        </div>
        <div class="col">
            <label for="pref_name">Preferred Name</label>
            <input type="text" id="pref_name" bind:value={pref_name} class="form-control" placeholder="Preferred">
        </div>
        <div class="col">
            <label for="middle_name">Middle Name</label>
            <input type="text" id="middle_name" bind:value={middle_name} class="form-control" placeholder="Middle">
        </div>
        <div class="col">
            <label for="last_name">Last</label>
            <input type="text" id="last_name" bind:value={last_name} class="form-control" placeholder="Last">
        </div>
    </div>
    <div class="row form-row">
        <div class="col">
            <label for="birthday">Birthday</label>
            <input type="date" id="birthday" bind:value={birthday} class="form-control">
        </div>
        <div class="col">
            <label for="sex">Sex</label>
            <select id="sex" bind:value={sex} class="form-control">
                <option value="M">Male</option>
                <option value="F">Female</option>
            </select>
        </div>
    </div>
    <button type="button" class="btn btn-danger" on:click="{close}">Cancel</button>
    <button type="button" class="btn btn-success" on:click="{updateSwimmer}">Save</button>
</div>

<!-- Latest compiled and minified CSS -->
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
  rel="stylesheet"
/>
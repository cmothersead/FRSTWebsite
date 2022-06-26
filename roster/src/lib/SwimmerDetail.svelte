<script>
    export let first_name, pref_name="", middle_name, last_name, sex, birthday;
</script>

<h1>Swimmer Data</h1>
<form>
    <div class="row">
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
    <div class="row">
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
</form>

<!-- Latest compiled and minified CSS -->
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
  rel="stylesheet"
/>
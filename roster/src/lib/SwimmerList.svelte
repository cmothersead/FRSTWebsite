<script>
  import Swimmer from './Swimmer.svelte'

  export let swimmers;
</script>


<table class="table table-striped table-hover">
  <thead class="table-dark">
    <tr>
      <th>First</th>
      <th>Middle</th>
      <th>Last</th>
      <th>Sex</th>
      <th>Age</th>
      <th>Birthday</th>
    </tr>
  </thead>
  <tbody>
    {#each swimmers as swimmer}
    <Swimmer {...swimmer}/>
    {/each}
  </tbody>
</table>

<!-- Latest compiled and minified CSS -->
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
  rel="stylesheet"
/>
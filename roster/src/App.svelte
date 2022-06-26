<script>
  import { onMount } from 'svelte';
  import { derived, writable } from 'svelte/store';
  import SwimmerList from './lib/SwimmerList.svelte'

  let swimmers = [];

  onMount(async () => {
    fetch("http://localhost:8000/swimmers/")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        swimmers =  data;
    }).catch(error => {
      console.log(error);
      return [];
    });
  });
</script>

<SwimmerList swimmers={swimmers}/>

<!-- Latest compiled and minified CSS -->
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
  rel="stylesheet"
/>
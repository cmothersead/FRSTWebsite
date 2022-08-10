<script>
    import { onMount } from "svelte";
    import { swimmers } from "./lib/stores";
    import SwimmerList from "./lib/SwimmerList.svelte";

    onMount(async () => {
        fetch("http://localhost:8000/api/swimmers/")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                swimmers.set(data);
            })
            .catch((error) => {
                console.log(error);
                return [];
            });
    });
</script>

<SwimmerList bind:swimmers={$swimmers} />

<!-- Latest compiled and minified CSS -->
<link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
    rel="stylesheet"
/>

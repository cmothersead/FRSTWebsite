<script>
  import SwimmerList from './lib/SwimmerList.svelte'

  let swimmers = [
    {
      first_name: 'Faith',
      middle_name: 'Ann Mackenzie',
      last_name: 'Boothe',
      sex: 'F',
      age: '13',
      birthday: '1/1/2000',      
    },
    {
      first_name: 'Rosalie',
      pref_name: 'Rosie',
      middle_name: 'not sure',
      last_name: 'Ackermann',
      sex: 'F',
      age: '7',
      birthday: '1/1/2002'
    }
  ]
</script>


<SwimmerList swimmers={swimmers}/>

<!-- Latest compiled and minified CSS -->
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
  rel="stylesheet"
/>
<script>
  import { seasonIndex } from '../storage.js'

	export let seasonData;
</script>

<div class="wrapper">
  {#if !seasonData}
    <div class="loading">
      loading season data...
    </div>
  {:else}
    <select on:change={(e) => seasonIndex.set(e.target.value)}>
      <option value="-1" disabled selected hidden>Vyberte semestr </option>
      {#each seasonData as {semester}, index}
        <option value="{index}">{semester.year} {semester.season}</option>
      {/each}
    </select>
  {/if}
</div>

<style>

</style>

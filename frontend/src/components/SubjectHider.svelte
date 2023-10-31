<script>
  import { createEventDispatcher } from 'svelte';

  export let subjectData;
  export let index;

  const dispatch = createEventDispatcher();

  function checkboxHandler(e,lecture){
    dispatch("subjectHideEvent",{
      "value": e.target.checked,
      "subjectIndex": index,
      "termType": lecture
    })
  }
</script>



<div class="wrapper">
  <div class="title">{subjectData.abbr} {subjectData.title}</div>
  {#each Object.keys(subjectData.terms) as lecture}
    <div class="term-line">
      <input type="checkbox" checked on:change={e => {checkboxHandler(e,lecture)}}/>
      {lecture}
    </div>
  {/each}
</div>

<style>

.wrapper {
  width: 350px;
  display: inline-block;
}

.title {
  text-align: center;
  border-bottom: 2px solid black
}
</style>

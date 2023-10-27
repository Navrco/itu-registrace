<script>
  export let subjectData;
  console.log(subjectData);
</script>

<div class="wrapper">
  <div class="title">{subjectData.abbr} {subjectData.title}</div>
  {#each Object.keys(subjectData.terms) as term}
    <div class="term-line">
      <input type="checkbox" checked/>
      {term}
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

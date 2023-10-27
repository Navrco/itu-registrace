<script>
	import { onMount } from 'svelte'
	import axios from 'axios';

	import { seasonIndex, subjectsLoading } from '../storage.js'
	import SubjectHider from './SubjectHider.svelte'

	let lecturesData = false;
	seasonIndex.subscribe(async (index) => {
		if(index == -1){
			return;
		}
		subjectsLoading.set(true);

		//Pridat do requestu idecka predmetu
		//console.log(seasonData[index].subjects)

		let response
		try {
			response = await axios.get("http://eva.fit.vutbr.cz:21213/static/semester");

		} catch(e) {
			return;
		}

		lecturesData = response.data
		console.log(lecturesData);

		subjectsLoading.set(false);
	});


	function computeStyles(termData){
		const offset = parseInt(termData.timeFrom) - 7
		return "left: " + String(offset*76) + "px";
	}


</script>

<div class="wrapper">
	{#if lecturesData}
		<div class="top">
			{#each lecturesData as lecture}
				<SubjectHider bind:subjectData={lecture} />
			{/each}
		</div>
		<div class="reg-form">
			{#each lecturesData as lecture}
				{#each Object.keys(lecture.terms) as lectureType}

					{#each lecture.terms[lectureType] as term}
						<div class="term" style="{computeStyles(term)}">
						{lecture.abbr} {term.type}
						</div>
					{/each}

				{/each}
			{/each}
		</div>


	{/if}
</div>

<style>
.reg-form{
	position: relative;
	width: 1000px;
	height: 100%;
	border: solid 1px black;
}

.term{
	position: relative;
	width: 76px;
	height: 50px;
	border: solid 1px green;
}
</style>

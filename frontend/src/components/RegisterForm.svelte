<script>
	import { onMount } from 'svelte'
	import axios from 'axios';

	import { seasonIndex, subjectsLoading } from '../storage.js'
	import SubjectHider from './SubjectHider.svelte'

	let lecturesData = false;


	function computeProperties(){
		let tmp = [0,0,0,0,0,0,0,0,0,0,0,0,0]

		for (let lectureIndex = 0; lectureIndex < lecturesData.length ;lectureIndex++){

			const lecture = lecturesData[lectureIndex];

			for (let lectureType in lecture.terms){

				const terms = lecture.terms[lectureType];

				for (let termIndex = 0; termIndex < terms.length; termIndex++){
					const term = terms[termIndex]
					let pos = parseInt(term.timeFrom) - 7;

					lecturesData[lectureIndex].terms[lectureType][termIndex].layout = {
						"column": pos + 1
					}

					//let span = parseInt(term.timeTo) - 6 - pos;


				}

			}

		}

	console.log(lecturesData);

	}

/*
  function checkboxHandler(e, subjectIndex, lectureType){
    if (!("disabled" in lecturesData[subjectIndex])){
      lecturesData[subjectIndex].disabled = {};
    }

    lecturesData[subjectIndex].disabled[lectureType] = !e.target.checked;
  }
*/

	function subjectHideHandler(e) {

		if (!("disabled" in lecturesData[e.detail.subjectIndex])){
      lecturesData[e.detail.subjectIndex].disabled = {};
    }

		lecturesData[e.detail.subjectIndex].disabled[e.detail.termType] = !e.detail.value;

		computeProperties();
	}

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
		//console.log(lecturesData.terms);

		computeProperties();

		subjectsLoading.set(false);
	});

/*
	function computeStyles(termData){
		const offset = parseInt(termData.timeFrom) - 6
		//return "left: " + String(offset*76) + "px";
		return "grid-column: " + String(offset);
	}
*/

</script>

<div class="wrapper">
	{#if lecturesData}

		<div class="top">
			{#each lecturesData as subject, i}
				<SubjectHider bind:subjectData={subject} index={i} on:subjectHideEvent={subjectHideHandler}/>
			{/each}
		</div>

		<div class="reg-form">
			{#each lecturesData as lecture}

				{#each Object.keys(lecture.terms) as lectureType}

					{#if !("disabled" in lecture && lecture.disabled[lectureType])}
						{#each lecture.terms[lectureType] as term}
							<div class="term" style={"grid-column:" + term.layout.column}>
							{lecture.abbr} {term.type}
							</div>
						{/each}
					{/if}

				{/each}
			{/each}
		</div>


	{/if}
</div>

<style>
.reg-form{
	position: relative;
	display: grid;
	grid-template-columns: repeat(13, 1fr);
	/*grid-template-areas: "a a a a a a a a a a a a a";*/
	width: 1000px;
	height: 100%;
	border: solid 1px black;
}

.term{
	position: relative;
	width: 76px;
	height: 50px;
	/*border: solid 1px green;*/
	background: cyan;
	grid-row: auto;

}
</style>

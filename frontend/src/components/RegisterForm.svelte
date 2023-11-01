<script>
	import { onMount } from 'svelte'
	import axios from 'axios';

	import { seasonIndex, subjectsLoading } from '../storage.js'
	import SubjectHider from './SubjectHider.svelte'

	let lecturesData = false;


	class rowOffsetCounter {
		constructor(){
			this.clearRows();
		}

		clearRows(){
			delete this.rows;
			this.rows = {
				"Po": [this.createRow()],
				"Út": [this.createRow()],
				"St": [this.createRow()],
				"Čt": [this.createRow()],
				"Pá": [this.createRow()]
			};
		}

		createRow(){
			let newRow = [];
			newRow.length = 14;
			newRow.fill(false);
			return newRow;
		}


		findSuitableRow(columStart,columnEnd,day){
			//newRowNeeded = false;
			columStart = columStart-2
			columnEnd = columnEnd-2

			for (let rowIndex = 0; rowIndex < this.rows[day].length; rowIndex++){
				let suitable = true;
				for(let spanIndex = columStart; spanIndex < columnEnd; spanIndex++){
					if(this.rows[day][rowIndex][spanIndex]){
						suitable = false
						break;
					}
				}

				if(suitable){
					for(let spanIndex = columStart; spanIndex < columnEnd; spanIndex++){

						//console.log(this.rows[day]);
						//console.log(spanIndex);

						this.rows[day][rowIndex][spanIndex] = true;
					}
					return rowIndex+1
				}

			}

			this.rows[day].push(this.createRow());
			for(let spanIndex = columStart; spanIndex < columnEnd; spanIndex++){
				this.rows[day][this.rows[day].length-1][spanIndex] = true;
			}
			return this.rows[day].length;

		}

	}

	const roc = new rowOffsetCounter();

	function computeProperties(){

		for (let lectureIndex = 0; lectureIndex < lecturesData.length ;lectureIndex++){

			const lecture = lecturesData[lectureIndex];

			for (let lectureType in lecture.terms){

				if ("disabled" in lecture && lecture.disabled[lectureType]){
					continue;
				}

				const terms = lecture.terms[lectureType];

				for (let termIndex = 0; termIndex < terms.length; termIndex++){
					const term = terms[termIndex]
					const start = parseInt(term.timeFrom) - 5;
					const end = parseInt(term.timeTo) - 4;

					/*
					for (let spanIndex = 0; i < start - end; spanIndex++){
						spanIndex
					}

					*/
					//console.log(span);

					lecturesData[lectureIndex].terms[lectureType][termIndex].layout = {
						"columnStart": start,
						"columnEnd": end,
						"row": roc.findSuitableRow(start,end,term.day)
					}


				}

			}

		}

	//console.log(lecturesData);

	}

/*
  function checkboxHandler(e, subjectIndex, lectureType){
    if (!("disabled" in lecturesData[subjectIndex])){
      lecturesData[subjectIndex].disabled = {};
    }

    lecturesData[subjectIndex].disabled[lectureType] = !e.target.checked;
  }
*/


	function getProperties(term){
		return `
			grid-column-start: ${term.layout.columnStart};
			grid-column-end: ${term.layout.columnEnd};
			grid-row: ${term.layout.row};
		`
	}

	function subjectHideHandler(e) {

		if (!("disabled" in lecturesData[e.detail.subjectIndex])){
      lecturesData[e.detail.subjectIndex].disabled = {};
    }

		lecturesData[e.detail.subjectIndex].disabled[e.detail.termType] = !e.detail.value;

		roc.clearRows();
		computeProperties();
		console.log(roc.rows["Po"]);
		lecturesData = lecturesData;
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

		roc.clearRows();
		computeProperties();
		console.log(roc.rows["Po"]);
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
			<div class="time-header">
				<div></div>
				{#each Array(14) as _, index (index)}
					<div class="time">{index+7}:00</div>
				{/each}
			</div>

			{#each ["Po","Út","St","Čt","Pá"] as day}
				<div class="reg-section">

					<div class="day">
					{day}
					</div>

					{#each lecturesData as lecture}

						{#each Object.keys(lecture.terms) as lectureType}

							{#if !("disabled" in lecture && lecture.disabled[lectureType])}
								{#each lecture.terms[lectureType] as term}
									{#if term.day == day}
										<div class="term" style={getProperties(term)}>
										{lecture.abbr} {term.type}
										</div>
									{/if}
								{/each}
							{/if}

						{/each}
					{/each}
				</div>
			{/each}
		</div>


	{/if}
</div>

<style>
.reg-form {
	position: relative;
	width: 1000px;
	height: 100%;
	border: solid 1px black;
}

.time-header {
	display: grid;
	grid-template-columns: 25px repeat(14, 76px);
}

.time {
	border-left: 1px solid black
}

.reg-section {
	display: grid;
	grid-template-columns: 25px repeat(14, 76px);
	width: 1000px;
	height: 100%;
	border-bottom: solid 1px red;
}

.day {
	grid-column: 1;
	justify-self: center;
	border-right: green 1px solid;
}

.term{
	position: relative;
	/*width: 76px;*/
	height: 50px;
	border: solid 1px black;

}
</style>

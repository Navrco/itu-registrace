<script>
	import { onMount } from 'svelte'
	import axios from 'axios';

	import { seasonIndex } from './storage.js'

	import Sidebar from './components/Sidebar.svelte'
	import SeasonSelector from './components/SeasonSelector.svelte'
	import RegisterForm from './components/RegisterForm.svelte'

	let menuSwitch = true;
	let seasonData = false;

	onMount(async () => {

		let response
		try {
			response = await axios.get("http://eva.fit.vutbr.cz:21213/static/season");

		} catch(e) {
			return;
		}

		seasonData = response.data;
	})

</script>

<main>

	<div class="header">
	</div>

	<div class="sidepanel">
		<Sidebar bind:menuSwitch={menuSwitch} />
	</div>

	<div class="content">
		<div class="upper">
			<SeasonSelector bind:seasonData={seasonData}/>
		</div>

		<div class="lower">
			{#if $seasonIndex == -1}
				<div>Pro pokračování musí být zvolen semestr</div>
			{:else}

				{#if menuSwitch}
					<div class="register-form">
						<RegisterForm />
					</div>
				{:else}
					<div class="time-form">
						loading timetable
					</div>
				{/if}
			{/if}
		<div>

	</div>

</main>

<style>
.header {
	position: fixed;
	margin: 0;
	padding: 0;
	width: 100%;
	height: 60px;
	background: #FFDDAB;
}

.sidepanel {
	position: fixed;
	margin-top: 60px;
	padding-top: 35px;
	width: 235px;
	height: 100%;
	background: #D9D9D9;
}

.content {
	padding: 60px 0 0 235px;
	color: black;
}

</style>

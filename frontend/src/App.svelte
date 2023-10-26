<script>
	import TestComponent from './components/TestComponent.svelte'
	import Sidebar from './components/Sidebar.svelte'

	let selected = true;

</script>

<main>

	<!--

	<h1>Valí to jak špina</h1>

	<p>
	Tady bude raz taky mocný rozvrh
	</p>

	<div>
		<TestComponent />
	</div>
	-->

	<div class="header">
	</div>

	<div class="sidepanel">
		<Sidebar bind:selected={selected} />
	</div>

	<div class="content">
		{#if selected}
			<div class="register-form">
			loading register
			</div>
		{:else}
			<div class="time-form">
			loading time
			</div>
		{/if}

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
	width: 235px;
	height: 100%;
	background: #D9D9D9;
}

.content {
	padding: 60px 0 0 235px;
	color: black;
}

</style>

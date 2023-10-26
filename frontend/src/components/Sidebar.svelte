<script>
	export let selected;
</script>

<button on:click={() => selected = true}>Registrace vyučování</button>
<button on:click={() => selected = false}>Rozvrh</button>

<style>

button {
	float: right;
	border: 0;
	padding: 10px 0 10px 30px;
	margin: 0;
	width: 195px;
	font-size: 0.85em;
	text-align: left;
	background-color: #888888;
	background-image: url("/sidebar-icon.svg");
	background-repeat: no-repeat;
	background-position: 7px center;
	background-size: 17px;
}

button:hover {
	background-color: #A2A2A2;
}
</style>

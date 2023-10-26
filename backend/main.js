const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const express = require('express');
const app = express();
const port = 21213;


app.get('/api/getsemesters', async (req, res) => {
  
	let response = "";
	try {
		response = await axios.get("https://www.fit.vut.cz/study/program/8450/.cs");
	} catch(e) {
		res.status(500).end();
		return;
	}

	const dom = new JSDOM(response.data);
	const tables = dom.window.document.getElementsByTagName('table');

	let dataset = [];

	for (let semester = 1; semester < 7; semester++){
		const table = tables[semester];

		let subjects = [];

		for (let subject = 1; subject < table.rows.length - 1; subject++){

			const row = table.rows.item(subject).childNodes;

			if (row[3].innerHTML != 'P'){
				break;
			}

			subjects.push({
				"abbr": row[0].innerHTML,
				"title": row[1].firstChild.firstChild.innerHTML,
				"faculty": row[5].innerHTML,
				"id": row[1].firstChild.href.split("/")[5],
				"link": row[1].firstChild.href
			});


		}

		const semesterData = table.caption.firstChild.innerHTML.split("\n");

		dataset.push({
			"semester": {
				"year": semesterData[0].trim(),
				"season": semesterData[1].trim()
			},
			"subjects": subjects
		});
	}


	res.status(200).json(dataset).end();
})

//eva.fit.vutbr.cz:21213/api/getsubjectdata?s=268223&s=268226&s=268237&s=268284&s=268296

async function fetchSubjectData(id){

	let response = "";
	try {
		response = await axios.get(`https://www.fit.vut.cz/study/course/${id}/.cs`);
	} catch(e) {
		return false;
	}

	const dom = new JSDOM(response.data);

	const title = dom.window.document.title.split("-");

	const list = dom.window.document.querySelectorAll('#main ul')[0];

	let span = [];
	for (let i = 1; i < list.childNodes.length; i+= 2){
		span.push(list.childNodes[i].innerHTML);
	}

	const table = dom.window.document.getElementsByTagName('table')[0];


	let terms = [];

	for (let term = 1; term < table.rows.length - 1; term++){
		//console.log(table.rows.item(term).innerHTML);

		const row = table.rows.item(term)
		const type = row.childNodes[2].childNodes[1].innerHTML;

		if (type == "zkouška"){
			continue;
		}

		const day = row.firstChild.innerHTML;

		const roomElements = row.childNodes[6].childNodes

		let rooms = [];

		for (let i = 1; i < roomElements.length; i+=2){
			rooms.push(roomElements[i].innerHTML)

		}

		const timeFrom = row.childNodes[7].innerHTML;
		const timeTo = row.childNodes[8].innerHTML

		const cap = row.childNodes[9].innerHTML;
		const name = row.childNodes[12].innerHTML;

		terms.push({
			"type": type,
			"day": day,
			"rooms": rooms,
			"timeFrom": timeFrom,
			"timeTo": timeTo,
			"cap": cap,
			"name": name
		})

	}

	let dataset = {
		"title": title[0],
		"abbr": title[1],
		"span": span,
		"terms": terms

	}

	return dataset;

}

app.get('/api/getsubjectdata', async (req, res) => {

	let idArray = req.query.s;

	if(idArray.constructor != Array){
		idArray = [idArray];
	}

	let dataset = [];

	for (let i = 0; i < idArray.length; i++){
		const result = await fetchSubjectData(idArray[i]);

		if (!result){
			res.status(500).end();
			return;
		}

		dataset.push(result);

	}


	res.status(200).json(dataset).end();
})


const seasonJson = require('./static_season_dataset.json');

app.get('/static/season', (req, res) => {
	res.status(200).json(seasonJson).end();
})

const semesterJson = require('./static_semester_dataset.json');

app.get('/static/semester', (req, res) => {
	res.status(200).json(semesterJson).end();
})


app.use((req, res, next) => {
 res.status(404).send("Not found");
})

app.use((err, req, res, next) => {
  res.status(500).send("Server error");
})


app.listen(port, () => {
  console.log(`Server valí na portu: ${port}`)
})


const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
//const express = require('express')
//const app = express()
const port = 21213

//Pridat konverzi do JSON a pridat do enpointu na získání předmětů

 axios
  .get("https://www.fit.vut.cz/study/program/8450/.cs")
  .then(function (response) {
    const dom = new JSDOM(response.data);
	const tables = dom.window.document.getElementsByTagName('table');
	
	for (let semester = 1; semester < 7; semester++){
		const table = tables[semester];
		
		console.log(table.caption.firstChild.innerHTML);
		
		for (let subject = 1; subject < table.rows.length - 1; subject++){
			
			const row = table.rows.item(subject).childNodes
			
			if (row[3].innerHTML != 'P'){
				break;
			}
			
			console.log(row[0].innerHTML + " " + row[1].firstChild.firstChild.innerHTML + " " + row[5].innerHTML);
			
		}
		
	}
	
  
	
   });



/*
app.get('/', (req, res) => {
  
 
  
  
  
  res.send('Hello World!')
})
*/

/*
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
*/
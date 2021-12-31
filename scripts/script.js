// //import fetch from "node-fetch";

// fetch("https://api.the-odds-api.com/v4/sports?apiKey=3d76b18d0834a940c9f7f2511cd08450")
// .then(response => {
// 	console.log(response);
// }).then(data => console.log(data))
// .catch(err => {
// 	console.error(err);
// });

// fetch("https://football-pro.p.rapidapi.com/api/v2.0/tvstations/fixture/11867339?tz=Europe%2FAmsterdam", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "football-pro.p.rapidapi.com",
// 		"x-rapidapi-key": "ac81564003mshac18851ef49a542p1dc604jsn3f0f121e7c3b"
// 	}
// })
// .then(response => {
// 	console.log(response);
// })
// .catch(err => {
// 	console.error(err);
// });
// const SerpApi = require('google-search-results-nodejs');
// const search = new SerpApi.GoogleSearch("e3e25b6d4bdccdab5c57f2decbaa5d93636e39f2cad0ce2304aff745b3d771f3");

// const params = {
//   q: "manchester united",
//   location: "austin, texas, united states"
// };

// const callback = function(data) {
//   console.log(data['sports_results']);
// };

// // Show result as JSON
// search.json(params, callback);
// url="https://serpapi.com/search.json?q=manchester+united&location=austin%2C+texas%2C+united+states&api_key=e3e25b6d4bdccdab5c57f2decbaa5d93636e39f2cad0ce2304aff745b3d771f3"
// fetch(url).then(response => response.json())
// .catch(err => console.log(err))
// var myHeaders = new Headers();
// let addTableDoc= document.getElementById("container");
// let API_TOKEN="YAwsvY89DMbIoH4QgsTg2rTdpOR24qcAHjmtSbTzl8UMu5RXOYRoWVEMppRB"
// let LEAGUE_NAME="EPL"
// let FIXTURE_ID = ""
// var requestOptions = {
//   method: 'GET',
//   headers: myHeaders,
//   redirect: 'follow',

// };
// let createTableTH = heading => {
//   console.log(heading)
//   console.log(addTableDoc)
//   addTableDoc.innerHTML+=`<table id='${heading.name}'><tr><th span=3>${heading.name}</th></tr></table>`
//   console.log(addTableDoc)
// }
// let returnData= (data)=>{
//   let lastSeason=""
//   fetch(`https://soccer.sportmonks.com/api/v2.0/seasons?api_token=${API_TOKEN}`)
//     .then(response =>response.json())
//     .then(data =>{ lastSeason=data.data[data.data.length - 1]
//       fetch(`https://soccer.sportmonks.com/api/v2.0/seasons/:${lastSeason.id}?api_token=${API_TOKEN}`)
//     .then(response =>response.json())
//     .then(data =>console.log(data) )})

//   return
// }
// fetch(`https://soccer.sportmonks.com/api/v2.0/leagues?api_token=${API_TOKEN}`, requestOptions)
//   .then(response => response.json())
//   .then(result =>
//     {
//       // console.log(result.data)
//       for (let n = 0;n< result.data.length;n++){
//         returnData(result.data[n])
//         createTableTH(result.data[n])}})

//   .catch(error => console.log('error', error));
//
// import * from '../node_modules'
let arrowButton = document.querySelector(".thatarrow")
let table = document.querySelector(".table_league");
let leagueTitle = document.getElementById("league");
let selectDoc =document.querySelector("#leagues");
let currentCompetition = 2;
let competitions = 0;
let lookfor = "";
let ran=true;
function compare( a, b ) {
	if ( a.id < b.id ){
	  return -1;
	}
	if ( a.id > b.id ){
	  return 1;
	}
	return 0;
  }
let addToTable = (data) => {
  
  table.innerHTML += `<tr><td>${data.rank}</td><td>${data.name}</td> <td>${data.matches}</td><td>${data.points}</td> <td>${data.won}</td> <td>${data.lost}</td><td>${data.drawn}</td><td>${data.goal_diff}</td> <td>${data.goals_conceded}</td> <td>${data.goals_scored}</td></tr>`;
};
function getCompetitonsName() {
	
  fetch(
    `https://live-score-api.p.rapidapi.com/competitions/list.json?secret=obxADujFSHjoiWyc1eJ6uRnuvg3NFph3&key=T5Fx5g8gZESziplt&&season=12&competition_id=${currentCompetition}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "live-score-api.p.rapidapi.com",
        "x-rapidapi-key": "ac81564003mshac18851ef49a542p1dc604jsn3f0f121e7c3b",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
		
      let league = "";
      
      competitions = data.data;
	  if(competitions==0)
	  console.log('this shit')
      league = competitions.competition.find(
        (element) => element.id == lookfor
      );
      console.log(competitions)
	  leagueTitle.innerText += " " + league.name;
      competitions.conpetition = competitions.competition.sort(compare)
	  if(ran){
	  competitions.competition.map(element=>{
		  if(element.countries[0]){
			selectDoc.innerHTML+=`<option value="${element.id}">${element.name} ${element.countries[0].name}</option>`
		  }
		  else{
			selectDoc.innerHTML+=`<option value="${element.id}">${element.name}</option>`
		  }
	  })
		ran=false
	} 
	  //console.log(selectDoc.innerHTML)
    })
    .catch((err) => {
      console.error(err);
    });
}

	function getDatafromApi(competition_id) {
		currentCompetition = competition_id;
  fetch(
    `https://live-score-api.p.rapidapi.com/leagues/table.json?secret=obxADujFSHjoiWyc1eJ6uRnuvg3NFph3&key=T5Fx5g8gZESziplt&&season=13&competition_id=${currentCompetition}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "live-score-api.p.rapidapi.com",
        "x-rapidapi-key": "ac81564003mshac18851ef49a542p1dc604jsn3f0f121e7c3b",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      lookfor = data.data.table[0].competition_id;
	  table.innerHTML ='<table class="table_league"><tr><th>rank:</th><th>name:</th> <th>matches:</th><th>points:</th> <th>won:</th> <th>lost:</th><th>drawn:</th><th>goal_diff:</th> <th>goals_conceded:</th> <th>goals_scored:</th></tr></table></tr></table>'
	  leagueTitle.innerText = "The league" 
	  for (let i = 0; i < data.data.table.length; i++) {
        addToTable(data.data.table[i]);
      }
	  getCompetitonsName();
	  
    })
    .catch((err) => {
      console.error(err);
    });
}
getDatafromApi(2);
arrowButton.addEventListener("click",()=>getDatafromApi(++currentCompetition))
selectDoc.addEventListener("change",()=>{
	console.log(selectDoc.value)
	return getDatafromApi(Number(selectDoc.value))})
console.log(competitions); //.find(element = element.competition_id)

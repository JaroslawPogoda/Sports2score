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
var myHeaders = new Headers();
let addTableDoc= document.getElementById("container");
let API_TOKEN="YAwsvY89DMbIoH4QgsTg2rTdpOR24qcAHjmtSbTzl8UMu5RXOYRoWVEMppRB"
let LEAGUE_NAME="EPL"
let FIXTURE_ID = ""
var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow',
  
};
let createTableTH = heading => {
  console.log(heading.name)
  addTableDoc.innerHTML+=`<table id='${heading.name}><tr><th span=3>${heading.name}</th></tr></table>'`}
fetch(`https://soccer.sportmonks.com/api/v2.0/leagues?api_token=${API_TOKEN}`, requestOptions)
  .then(response => response.json())
  .then(result => 
    {
      // console.log(result.data)
      for (let n = 0;n< result.data.length;n++){
        createTableTH(result.data[n])}})
  .catch(error => console.log('error', error));
let arrowButtonRight = document.querySelector(".thatarrow");
let arrowButtonLeft = document.querySelector(".thatarrow2");
let table = document.querySelector(".table_league");
let leagueTitle = document.getElementById("league");
let selectDoc = document.querySelector("#leagues");
let currentCompetition = 2;
let competitions = 0;
let lookfor = "";
let ran = true;
let currentindex = 45;
let currentcompetitionlookup = [
  {
    season: {
      id: "13",
      name: "2021/2022",
      start: "2021-07-01",
      end: "2022-06-30",
    },
  },
];
function compare(a, b) {
  if (a.id < b.id) {
    return -1;
  }
  if (a.id > b.id) {
    return 1;
  }
  return 0;
}
let addToTable = (data) => {
  table.innerHTML += `<tr id="table_for_league" onclick="getFixturesForTeam('${data.team_id}')"><td>${data.rank}</td><td>${data.name}</td> <td>${data.matches}</td><td>${data.points}</td> <td>${data.won}</td> <td>${data.lost}</td><td>${data.drawn}</td><td>${data.goal_diff}</td> <td>${data.goals_conceded}</td> <td>${data.goals_scored}</td></tr>
  <tr><td span=10></tr>`;
  //getFixturesForTeam(data.team_id)
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
      if (competitions == 0) console.log("this shit");
      league = competitions.competition.find(
        (element) => element.id == lookfor
      );
      console.log(competitions);
      leagueTitle.innerText += " " + league.name;

      competitions.competition = competitions.competition.sort(compare);
      competitions.competition = competitions.competition.filter(
        (element) => element.is_league == 1
      );
      if (ran) {
        competitions.competition.map((element) => {
          if (element.countries[0]) {
            selectDoc.innerHTML += `<option value="${element.id}">${element.name} ${element.countries[0].name}</option>`;
          } else {
            selectDoc.innerHTML += `<option value="${element.id}">${element.name}</option>`;
          }
        });
        ran = false;
      }
      //console.log(selectDoc.innerHTML)
    })
    .catch((err) => {
      console.error(err);
    });
}

function getDatafromApi(competition_id) {
  console.log(competition_id);
  currentCompetition = competition_id;
  if (!ran) {
    console.log(
      competitions.competition.filter(
        (element) => element.id == currentCompetition
      )
    );
    currentcompetitionlookup = competitions.competition.filter(
      (element) => element.id == currentCompetition
    );
  }
  console.log(currentcompetitionlookup[0].season.id);
  fetch(
    `https://live-score-api.p.rapidapi.com/leagues/table.json?secret=obxADujFSHjoiWyc1eJ6uRnuvg3NFph3&key=T5Fx5g8gZESziplt&&season=${currentcompetitionlookup[0].season.id}&competition_id=${currentCompetition}`,
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
      if (data.data.table[0]) {
        lookfor = data.data.table[0].competition_id;

        table.innerHTML =
          '<table class="table_league"><tr><th>rank:</th><th>name:</th> <th>matches:</th><th>points:</th> <th>won:</th> <th>lost:</th><th>drawn:</th><th>goal_diff:</th> <th>goals_conceded:</th> <th>goals_scored:</th></tr></table></tr></table>';
        leagueTitle.innerText = "The league";
        for (let i = 0; i < data.data.table.length; i++) {
          addToTable(data.data.table[i]);
        }

        getCompetitonsName();
      }
    })
    .catch((err) => {
      console.error(err);
    });
}
getDatafromApi(2);
arrowButtonRight.addEventListener("click", () => {
  console.log(
    competitions.competition.find((element, index) => {
      currentindex = index;
      return element.id == currentCompetition;
    })
  ); //.indexof(competitions.competition.find(element=>element.id==currentCompetition)))
  console.log(currentindex);
  currentCompetition = Number(competitions.competition[currentindex].id);
  return getDatafromApi(competitions.competition[++currentindex].id);
});

arrowButtonLeft.addEventListener("click", () => {
  console.log(
    competitions.competition.find((element, index) => {
      currentindex = index;
      return element.id == currentCompetition;
    })
  ); //.indexof(competitions.competition.find(element=>element.id==currentCompetition)))
  console.log(currentindex);
  currentCompetition = Number(competitions.competition[currentindex].id);
  return getDatafromApi(competitions.competition[--currentindex].id);
});

selectDoc.addEventListener("change", () => {
  currentCompetition = selectDoc.value;
  return getDatafromApi(Number(currentCompetition));
});
console.log(competitions); //.find(element = element.competition_id)
function getFixturesForTeam(idOfTeam){
fetch(`https://live-score-api.p.rapidapi.com/fixtures/matches.json?secret=obxADujFSHjoiWyc1eJ6uRnuvg3NFph3&key=T5Fx5g8gZESziplt&team=${idOfTeam}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "live-score-api.p.rapidapi.com",
		"x-rapidapi-key": "ac81564003mshac18851ef49a542p1dc604jsn3f0f121e7c3b"
	}
})
.then(response => response.json())
.then(data=>console.log(data.data))
.catch(err => {
	console.error(err);
});
}
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
  table.innerHTML += `<tr id="table_for_league${data.team_id}" onclick="getFixturesForTeam('${data.team_id}')"><td>${data.rank}</td><td>${data.name}</td> <td>${data.matches}</td><td>${data.points}</td> <td class="visibleOnMobile">${data.won}</td> <td class="visibleOnMobile">${data.lost}</td><td class="visibleOnMobile">${data.drawn}</td><td class="visibleOnMobile">${data.goal_diff}</td> <td class="visibleOnMobile">${data.goals_conceded}</td> <td class="visibleOnMobile">${data.goals_scored}</td></tr>
  <tr><td colspan="10" id = "fixtures${data.team_id}"></td></tr>`;
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
      if (competitions == 0) console.log("this no competition");
      league = competitions.competition.find(
        (element) => element.id == lookfor
      );
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
  currentCompetition = competition_id;
  if (!ran) {
      competitions.competition.filter(
        (element) => element.id == currentCompetition
      )
    currentcompetitionlookup = competitions.competition.filter(
      (element) => element.id == currentCompetition
    );
  }
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
          '<table class="table_league"><tr><th>Rank:</th><th>Name:</th> <th>Matches:</th><th>Points:</th> <th  class="visibleOnMobile">Won:</th> <th  class="visibleOnMobile">Lost:</th><th class="visibleOnMobile">Drawn:</th><th class="visibleOnMobile">Difference:</th> <th  class="visibleOnMobile">Conceded:</th> <th class="visibleOnMobile">Scored:</th></tr></table></tr></table>';
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

    competitions.competition.find((element, index) => {
      currentindex = index;
      return element.id == currentCompetition;
    })
 //.indexof(competitions.competition.find(element=>element.id==currentCompetition)))
  currentCompetition = Number(competitions.competition[currentindex].id);
  return getDatafromApi(competitions.competition[++currentindex].id);
});

arrowButtonLeft.addEventListener("click", () => {
    competitions.competition.find((element, index) => {
      currentindex = index;
      return element.id == currentCompetition;
    })
   //.indexof(competitions.competition.find(element=>element.id==currentCompetition)))
  currentCompetition = Number(competitions.competition[currentindex].id);
  return getDatafromApi(competitions.competition[--currentindex].id);
});

selectDoc.addEventListener("change", () => {
  currentCompetition = selectDoc.value;
  return getDatafromApi(Number(currentCompetition));
}); //.find(element = element.competition_id)
function getFixturesForTeam(idOfTeam, index = 0) {
  fetch(
    `https://live-score-api.p.rapidapi.com/fixtures/matches.json?secret=obxADujFSHjoiWyc1eJ6uRnuvg3NFph3&key=T5Fx5g8gZESziplt&team=${idOfTeam}`,
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
      let tdFixturesDoc = document.getElementById(`fixtures${idOfTeam}`);
      let tdFixturesDoc2 = document.querySelector(`.match${idOfTeam}`);
      if (tdFixturesDoc2 != null && tdFixturesDoc2.style.display == "none") {
        tdFixturesDoc2.style.display = "table-cell";
        document.querySelector(`.arrowRight${idOfTeam}`).style.display =
          "table-cell";
        document.querySelector(`.arrowLeft${idOfTeam}`).style.display =
          "table-cell";
      } else if (tdFixturesDoc2 != null) {
        tdFixturesDoc2.style.display = "none";
        document.querySelector(`.arrowRight${idOfTeam}`).style.display = "none";
        document.querySelector(`.arrowLeft${idOfTeam}`).style.display = "none";
      } else {
        tdFixturesDoc.innerHTML = `<div class="container2">
  <ion-icon class="arrow4 thatarrow4 arrowLeft${idOfTeam}" name="chevron-back-outline" ></ion-icon>
	<div class="match match${idOfTeam}">
		<div class="match-header">
			<div class="match-tournament${idOfTeam}">${data.data.fixtures[index].competition.name}</div>
      <div></div>
		</div>
		<div class="match-content">
			<div class="column">
				<div class="team team--home${idOfTeam}">
					<h2 class="team-nameh${idOfTeam}">${data.data.fixtures[index].home_name}</h2>
				</div>
			</div>
			<div class="column">
				<div class="match-details">
					<div class="match-date${idOfTeam}">
						${data.data.fixtures[index].date} at <strong>${data.data.fixtures[index].time}</strong>
					</div>
					<div class="match-score">
						<span class="match-score-divider">vs.</span>
					</div>
					<div class="match-referee${idOfTeam}">
						Location: <strong>${data.data.fixtures[index].location}</strong>
					</div>
					<div class="match-bet-options">
						<button class="match-bet-option match-bet-option1${idOfTeam}">${data.data.fixtures[index].odds.live[1]}</button>
						<button class="match-bet-option match-bet-option2${idOfTeam}">${data.data.fixtures[index].odds.live[2]}</button>
						<button class="match-bet-option match-bet-option3${idOfTeam}">${data.data.fixtures[index].odds.live.X}</button>
					</div>
				</div>
			</div>
			<div class="column">
				<div class="team team--away">
					<h2 class="team-namea${idOfTeam}"> ${data.data.fixtures[index].away_name}</h2>
				</div>
			</div>
		</div>
	</div>
  <div></div>
  <ion-icon class="arrow3 thatarrow3 arrowRight${idOfTeam}"  name="chevron-forward-outline" ></ion-icon>
</div>
`;
        //onclick="getNextFixture(${data.data.fixtures[(index+1)]},${index},${idOfTeam})"
        let arrowRightTag = document.querySelector(`.arrowRight${idOfTeam}`);
        arrowRightTag.addEventListener("click", () => {
          if (index >= 0 && ++index < data.data.fixtures.length) {
            document.querySelector(`.match-tournament${idOfTeam}`).innerText =
              data.data.fixtures[index].competition.name;
            document.getElementsByClassName(
              `team-nameh${idOfTeam}`
            )[0].innerText = data.data.fixtures[index].home_name;
            document.getElementsByClassName(
              `match-date${idOfTeam}`
            )[0].innerHTML = `${data.data.fixtures[index].date} at <strong>${data.data.fixtures[index].time}</strong>`;
            document.getElementsByClassName(
              `match-referee${idOfTeam}`
            )[0].innerHTML = `Location: <strong>${data.data.fixtures[index].location}</strong>`;
            document.getElementsByClassName(
              `match-bet-option1${idOfTeam}`
            )[0].InnerHTML = data.data.fixtures[index].odds.live[1];
            document.getElementsByClassName(
              `match-bet-option2${idOfTeam}`
            )[0].innerHTML = data.data.fixtures[index].odds.live[2];
            document.getElementsByClassName(
              `match-bet-option3${idOfTeam}`
            )[0].innerHTML = data.data.fixtures[index].odds.live.X;
            document.getElementsByClassName(
              `team-namea${idOfTeam}`
            )[0].innerText = data.data.fixtures[index].away_name;
          }
          // ;
        });
        let arrowLeftTag = document.querySelector(`.arrowLeft${idOfTeam}`);
        arrowLeftTag.addEventListener("click", () => {
          if (--index >= 0 && index < data.data.fixtures.length) {
            document.querySelector(`.match-tournament${idOfTeam}`).innerText =
              data.data.fixtures[index].competition.name;
            document.getElementsByClassName(
              `team-namea${idOfTeam}`
            )[0].innerText = data.data.fixtures[index].home_name;
            document.getElementsByClassName(
              `match-date${idOfTeam}`
            )[0].innerHTML = `${data.data.fixtures[index].date} at <strong>${data.data.fixtures[index].time}</strong>`;
            document.getElementsByClassName(
              `match-referee${idOfTeam}`
            )[0].innerHTML = `Location: <strong>${data.data.fixtures[index].location}</strong>`;
            document.getElementsByClassName(
              `match-bet-option1${idOfTeam}`
            )[0].innerHTML = data.data.fixtures[index].odds.live[1];
            document.getElementsByClassName(
              `match-bet-option2${idOfTeam}`
            )[0].innerHTML = data.data.fixtures[index].odds.live[2];
            document.getElementsByClassName(
              `match-bet-option3${idOfTeam}`
            )[0].innerHTML = data.data.fixtures[index].odds.live.X;
            document.getElementsByClassName(
              `team-nameh${idOfTeam}`
            )[0].innerText = data.data.fixtures[index].away_name;
            // ;
          }
        });
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

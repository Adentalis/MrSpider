var fs = require("fs");

let teams = [];
initAllTeams();

//create filter requests
//give me teams with specific champion
let filterResOne = filterByChampion("Yasou", teams);

//give me teams with specific champions
let championsInTeam = ["Veigar", "Zyra", "Kindred"];
let filterResAll = filterByChampions(championsInTeam, teams);

//give me teams with specific synergie
let filterSynergy = filterBySynergy("INFERNO", teams);
let withoutYi = filterByNoChampion("Zed", filterSynergy);

//give me teams with specific synergiies
let synergiesInTeam = ["SUMMONER", "GLACIAL", "DESERT"];
let filterSynergies = filterBySynergies(synergiesInTeam, teams);
let sortedTeam = sortTeamsBy(filterSynergies, "teamCosts");

analyseTeam(teams);

//init functions
function initAllTeams() {
  let files = fs.readdirSync("./tft/combinations/");
  files.forEach(file => {
    let data = fs
      .readFileSync("./tft/combinations/" + file)
      .toString()
      .split("\n");
    //read the files and create JSON Teams
    data.forEach(line => {
      let team = {
        champions: [],
        synergies: []
      };
      let parts = line.split("--");

      //parts[0] -> "Vladimir(1)-LeBlanc(2)-Varus(2)-Aatrox(3)-Kindred(3)-Brand(4)-Master Yi(5)-Nami(5)"
      //init champions and teamCost
      let champions = parts[0].split("-");
      let teamCosts = 0;
      champions.forEach(e => {
        team.champions.push(e.slice(0, -3));
        teamCosts += parseInt(e.slice(e.length - 2, e.length - 1));
      });
      team.teamCosts = teamCosts;

      //init size
      team.size = champions.length;

      //parts[1] -> "MAGE(3)-RANGER(2)-BLADEMASTER(2)-SHADOW(2)-MYSTIC(2)-INFERNO(3)-OCEAN(2)"
      //init synergies
      let synergies = parts[1].split("-");
      synergies.forEach(e => {
        let res = {
          synergy: e.slice(0, -3),
          value: e.slice(e.length - 2, e.length - 1)
        };
        team.synergies.push(res);
      });

      //sum up all synergies
      let synergiesCounter = 0;
      team.synergies.forEach(e => {
        synergiesCounter += parseInt(e.value);
      });
      team.synergiesCounter = synergiesCounter;

      //parts[2] -> "[-529290868] " -- TODO refactor at java -> there is " " after the ]
      //init javaHash
      team.javaHash = parts[2].slice(1, -2);

      teams.push(team);
    });
  });
}

//filter functions
function filterByChampion(championName, teamToFilter) {
  let dummmy = [];
  teamToFilter.forEach(e => {
    if (e.champions.includes(championName)) {
      dummmy.push(e);
    }
  });
  return dummmy;
}

function filterByChampions(championNames, teamToFilter) {
  let dummy = [...teamToFilter];
  championNames.forEach(e => {
    dummy = filterByChampion(e, dummy);
  });
  return dummy;
}

function filterByNoChampion(championName, teamToFilter) {
  let dummmy = [];
  teamToFilter.forEach(e => {
    if (!e.champions.includes(championName)) {
      dummmy.push(e);
    }
  });
  return dummmy;
}

function filterBySynergy(synergyToFilter, teamToFilter) {
  let dummmy = [];
  teamToFilter.forEach(team => {
    team.synergies.forEach(syn => {
      if (syn.synergy === synergyToFilter) dummmy.push(team);
    });
  });
  return dummmy;
}

function filterBySynergies(synergiesToFilter, teamToFilter) {
  let dummy = [...teamToFilter];
  synergiesToFilter.forEach(e => {
    dummy = filterBySynergy(e, dummy);
  });
  return dummy;
}

//statistic functions
function analyseTeam(teamToAnalyse) {
  console.log("Team to analyse contains " + teamToAnalyse.length + " teams");
  //championsCounter is a hashmap -> champions : counter
  let championCounter = [];
  teamToAnalyse.forEach(team => {
    team.champions.forEach(champ => {
      if (champ in championCounter) {
        championCounter[champ] = championCounter[champ] + 1;
      } else {
        championCounter[champ] = 1;
      }
    });
  });

  for (var champion in championCounter) {
    console.log(
      "Key: " +
        champion +
        "--> Value: " +
        championCounter[champion] +
        " --> " +
        ((championCounter[champion] / teamToAnalyse.length) * 100).toFixed(2) +
        "%"
    );
  }
}

//helper functions
function sortTeamsBy(teams, selector) {
  return teams.sort((teamA, teamB) => {
    return teamB[selector] - teamA[selector];
  });
}

console.log("e");

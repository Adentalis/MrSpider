const { drawRound } = require("./drawing.js");
const { createPlayersFromJSON, updatePlayers } = require("./player");
const { tournamentJSON15Players } = require("./data.js");
let players = createPlayersFromJSON(tournamentJSON15Players);

console.log("rk");

const roundsToPlay = 6;

for (let round = 1; round <= roundsToPlay; round++) {
  let matches = drawRound(players);
  players = updatePlayers(players, matches);
  debugger;
  console.log("gg");
}

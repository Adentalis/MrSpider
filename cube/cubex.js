const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');
const readline = require('readline');

const creds = require('./client_secret.json');

let words = [];

//---------------------GAME PARAMETERS
const AMOUNT_OF_WORDS = 10;
const TIME_BETWEEN_EACH_WORD = 1000; //in ms

async function accessSpreadsheet() {
    console.log("Get Data from G-Sheet");
    const doc = new GoogleSpreadsheet('16sFhj9pkwuDcAxwTCkjrQfOCZk2gIrxurs1DRtuhNmg');
    await promisify(doc.useServiceAccountAuth)(creds);
    const info = await promisify(doc.getInfo)();
    const sheet = info.worksheets[0];

    //von links nach rechts vom oben nach unten - wie ein Buch
    const cells = await promisify(sheet.getCells)({
        //row = das von oben nach unten
        'min-row': 5,
        'max-row': 26,

        //column = das von links nach rechts
        'min-col': 3,
        'max-col': 24
    });

    cells.forEach(element => {
        words.push({
            value: element.value,
            col: element.col,
            row: element.row,
            shortcut: element.value.replace(/[a-z]/g, '')
        });
    });

    playGame();

}

accessSpreadsheet();

function playGame() {
    console.log("---Start Game---");

    const choosenWords = getRandom(words, AMOUNT_OF_WORDS);

    start(0, choosenWords);

    var rl = readline.createInterface(process.stdin, process.stdout);
    rl.question("", function (answer) {
        console.log(answer);
    })
}

function start(counter, words) {
    if (counter < AMOUNT_OF_WORDS) {
        setTimeout(function () {
            counter++;
            console.log(counter, words[counter - 1].value);
            start(counter, words);
        }, 1000);
    }
}

function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}


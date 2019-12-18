const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');


const creds = require('./client_secret.json');

let words = [];

//---------------------GAME PARAMETERS
const AMOUNT_OF_WORDS = 3;
const TIME_BETWEEN_EACH_WORD = 1000; //in ms

/*  ----GAMEMODES---
    1 = 10 Wörter kommen nacheinander und einfach merken
    2 = es kommt alle x Sekunden eine Abkürzung 

*/
const GAMEMODE = 1;

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
            shortcut: element.value.replace(/[a-z]/g, ''),
            startWithShortCut : checkStart(element)
        });
    });

    checkWords();

    words.forEach(e=>{
        console.log(e);
    })

    switch (GAMEMODE) {
        case 1:
            startShow(0, getRandom(words, AMOUNT_OF_WORDS));
            break;
        case 2: show1ShortcutAfterAnother(0, getRandom(words, AMOUNT_OF_WORDS));
            break;
        default:
            break;
    }

}

accessSpreadsheet();

function checkStart(e){
    let start = e.value.substring(0,2);
    start = start.replace(/[a-z]/g, '');
    return start.length == 2;
}


//---------------------GAMEMODE 1---------------------
function startShow(counter, words) {
    if (counter < AMOUNT_OF_WORDS) {
        setTimeout(function () {
            counter++;
            console.log(counter, words[counter - 1].value);
            startShow(counter, words);
        }, TIME_BETWEEN_EACH_WORD);
    }
}

//---------------------GAMEMODE 2---------------------
function show1ShortcutAfterAnother(c, words) {

    setTimeout(function () {
        c++;
        console.log(words[c].shortcut);
        show1ShortcutAfterAnother(c, words);

        setTimeout(function () {
            console.log(words[c].value);
            console.log("------------")
        }, TIME_BETWEEN_EACH_WORD / 2);

    }, TIME_BETWEEN_EACH_WORD);

}

//get n random elements of an array
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

//check everyword if its shortcut has 2 Uppercase letters
function checkWords() {
    console.log("chek all words ")
    words.forEach(e => {
        if (e.shortcut.length !== 2) {
            console.log(e.value, "ist falsch!!")
        }
    })
}




console.log("ff");

var fs = require("fs"),
  readline = require("readline");

var rd = readline.createInterface({
  input: fs.createReadStream("formatter_scripts/money.txt"),
  console: false,
});

var counter = 0;
rd.on("line", function (line) {
  if (++counter % 4 === 3) {
    console.log(line);
  }
});

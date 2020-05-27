//var request = require('request');
var cheerio = require('cheerio');
var FormData = require('form-data');
var URL = require('url-parse');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var http = require('http');


var form = new FormData();
form.append("targetPage", "ttps%3A%2F%2Fwww.mytischtennis.de%2Fcommunity%2Flogin%3Ffromlogin%3D1");
form.append("goLogin", "Einloggen");



console.log("test mytt Login");
//Authorization: Basic a3VjaGVuYm9tYmU6dHhsb2R5ZG10b3B6


let url = "https://www.mytischtennis.de/community/login";
let url2 = "https://www.n-tv.de";

form.submit({
  host: "https://www.mytischtennis.de",
  path: '/community/login',
  headers: form.getHeaders()
}, function(err, res) {
  console.log(res.statusCode);
});



// request(url, function (error, response, body) {
//   // Check status code (200 is HTTP OK)
//   console.log("Status code: " + response.statusCode);
//   if (response.statusCode !== 200) {
//     console.log("!== 200")
//   } else {
//     console.log("SCUCCES");
//     var $ = cheerio.load(body);
//   }

// });

// var request = new XMLHttpRequest();
// request.open('POST', url2, true);
// request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
// request.setRequestHeader('Authorization', 'Basic a3VjaGVuYm9tYmU6dHhsb2R5ZG10b3B6');
// request.setRequestHeader('Accept', 'application/json');

// request.onreadystatechange = function () {
//   console.log("received sth");
//     if (request.readyState === 4) {
//        alert(request.responseText);
//     }
// };
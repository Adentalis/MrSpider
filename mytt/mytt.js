var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');

function testReq(){
    console.log("test mytt Login");

   let url = "https://www.mytischtennis.de/community/index/";

   request(url, function(error, response, body) {
    // Check status code (200 is HTTP OK)
    console.log("Status code: " + response.statusCode);
    if(response.statusCode !== 200) {
      console.log("!=== 200")
      return;
    }else{
        console.log("SCUCCES");
        var $ = cheerio.load(body);
        debugger;
    }
    
 });

}

module.exports.testReq = testReq;
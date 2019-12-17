var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var myTT = require("./mytt");

var START_URL = "https://www.mytischtennis.de/public/home/";
var SEARCH_WORD = "stemming";
var MAX_PAGES_TO_VISIT = 10;

var pagesVisited = {};
var numPagesVisited = 0;
var pagesToVisit = [];
var absoluteHREFS =[];
var url = new URL(START_URL);
var baseUrl = url.protocol + "//" + url.hostname;

pagesToVisit.push(START_URL);
// crawl();
testReq();


function testReq(){
  console.log("test mytt Login");
  const url='https://www.mytischtennis.de/community/login/';

  var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  const req = new XMLHttpRequest();

  
  var FormData = require('form-data');
  var form = new FormData();
  form.append("userNameB", "kuchenbombe");
  form.append("userPassWordB", "txlodydmtopz");
  form.append("targetPage", "https://www.mytischtennis.de/community/index?fromlogin=1");


  
  req.open("POST", url);
  req.setRequestHeader('Content-Type', 'application/json');
  req.withCredentials = true;
  req.send(form);
  
  req.onreadystatechange = (e) => {
    console.log(req.responseText)
  }
  req.onload = () => alert(req.response);
}

function crawl() {
  debugger;
  if(numPagesVisited >= MAX_PAGES_TO_VISIT) {
    console.log("Reached max limit of number of pages to visit.");
    return;
  }
  var nextPage = pagesToVisit.pop();
  if (nextPage in pagesVisited) {
    // We've already visited this page, so repeat the crawl
    crawl();
  } else {
    // New page we haven't visited
    visitPage(nextPage, crawl);
  }
}

function visitPage(url, callback) {
  // Add page to our set
  pagesVisited[url] = true;
  numPagesVisited++;

  // Make the request
  console.log("Visiting page " + url);
  request(url, function(error, response, body) {
     // Check status code (200 is HTTP OK)
     console.log("Status code: " + response.statusCode);
     if(response.statusCode !== 200) {
       callback();
       return;
     }
     // Parse the document body
     var $ = cheerio.load(body);
     var isWordFound = searchForWord($, SEARCH_WORD);
     if(isWordFound) {
       console.log('Word ' + SEARCH_WORD + ' found at page ' + url);
     } else {
       collectInternalLinks($);
       // In this short program, our callback is just calling crawl()
       callback();
     }
  });
}

function searchForWord($, word) {
  var bodyText = $('html > body').text().toLowerCase();
  return(bodyText.indexOf(word.toLowerCase()) !== -1);
}

function collectInternalLinks($) {
    var relativeLinks = $("a[href^='/']");
    var absoluteLinks = $("a[href^='http']");
    console.log("Found " + relativeLinks.length + " relative links on page");
    relativeLinks.each(function() {
        pagesToVisit.push(baseUrl + $(this).attr('href'));
    });
   // console.log(relativeLinks);
}
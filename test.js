'use strict';

var jsdom = require('jsdom');
var fs = require('fs');
var chalk = require('chalk');

function testLinks(err, window){
  console.log(chalk.yellow('\n[testing '+window.document.title+']'));
  Array.from(window.document.getElementsByTagName('a')).map(function(el){
    return el.href;
  }).filter(function(el){
    return el.substring(0,7) === 'file://';
  }).forEach(function(el){
    try {
      fs.statSync(el.substring(7));
      console.log(chalk.green('[success]'), el);
    } catch (err) {
      console.log(chalk.red('[failure]'), el);
      process.exit(1);
    }
  });
}

fs.readdirSync('.').filter(function(el){
  return el.substring(el.length-5) === '.html';
}).forEach(function(el, index, array){
  jsdom.env(el, testLinks);
});


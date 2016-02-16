// Count all of the links from the io.js build page
var jsdom = require('jsdom');
var fs = require('fs');
var chalk = require('chalk');
var failure = false;

jsdom.env(
	'index.html', function(err, window){
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
        failure = true;
      }
    });
	}
);

if (failure){
  process.exit(1);
}

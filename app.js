
// Based on the url the user hits , I want you to return custom responses.
// When url = /home , return response ==> Welcome home
// When url = /about, return response ==> Welcome to About Us page
// When url =/node, return response ==> Welcome to my Node Js project

const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer(function (req, res) {
  	
  	// localhost:9000/demo2.html 

  	const urlObject = url.parse(req.url, true);
  	const fileName = "." + urlObject.pathname;		// 		./demo2.html 	

  	fs.readFile(fileName, function(err, data) {

  		if (err) {
  			res.writeHead(404, {'Content-Type': 'text/html'});
  			return res.end("404 Not Found");
  		}

  		res.writeHead(200, {'Content-Type': 'text/html'}); 
  		res.write(data);
  		res.end();
  	});

});

server.listen(3000, () => { 
	console.log('Server is running...'); 
}); 
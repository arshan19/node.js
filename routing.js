const http = require('http');

const routes = require('./routes.js');

//const server = http.createServer(routes);


console.log(routes.someText);
// if we use second methhod of module,export
const server = http.createServer(routes.handler);

server.listen(3000);
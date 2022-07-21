const http= require('http');
const fs = require('fs');

const server = http.createServer((req,response) => {
    const url = req.url;
    const method = req.method;
    const data1 = fs.readFileSync('message.txt', 'utf8');
    console.log(data1 + "console");
    if(url === '/'){
        response.write('<Html>');
        response.write('<Head><title>Enter Message</title><html>');

        response.write('<body><form action = "/message" method = "POST">');
        response.write(`<h3>${data1}</h3>`);
        response.write('<input type = "text" name = "message"><button type = "submit">Send</button></form>');

        response.write('</body>');
        response.write('</Html>');
        return response.end();
    }
    if (url === '/message' && method === 'POST'){
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt', message);
        });

        response.statusCode = 302;
        response.setHeader('Location','/');
        return response.end();
    }
    response.setHeader('Content-Type','text/html');
    response.write('<Html>');
    response.write('<Head><title>My first Page</title><html>');
    response.write('<body><h1>"Welcome to my Node Js project"</h1></body>');
    response.write('</Html>');
    response.end();
});

server.listen(3000);
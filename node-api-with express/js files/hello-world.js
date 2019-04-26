var http = require('http');
const hostname = '127.0.0.2';
const port = 9000;
const server= http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    // we can use single statement or multiple statments
    // res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
})
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

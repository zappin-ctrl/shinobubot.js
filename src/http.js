import http from "http";

const port = parseInt(process.env.HTTP_KEEPALIVE);
if (!isNaN(port)) {
    http.createServer((request, response) => {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/html');
        response.end('Running Shinobot!');
    }).listen(port);
}

const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;

    if (filePath === './') {
        filePath = './index.html';
    }

    filePath = path.resolve(filePath);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            fs.readFile('./404.html', (err, data) => {
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end(data);
            });
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        }
    });
});

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const http = require('http');
const controller = require('./controller/controller');

const server = http.createServer((req, res) => {
    if (req.url === '/api/products' && req.method === 'GET') {
        controller.get_all_product(req, res);
    } else if (
        req.url.match(/\/api\/products\/([0-9]+)/) &&
        req.method === 'GET'
    ) {
        const id = req.url.split('/')[3];
        controller.get_product(req, res, id);
    } else if (req.url === '/api/products' && req.method === 'POST') {
        controller.create_product(req, res);
    } else if (
        req.url.match(/\/api\/products\/([0-9]+)/) &&
        req.method === 'PUT'
    ) {
        const id = req.url.split('/')[3];
        controller.update_product(req, res, id);
    } else if (
        req.url.match(/\/api\/products\/([0-9]+)/) &&
        req.method === 'DELETE'
    ) {
        const id = req.url.split('/')[3];
        controller.delete_product(req, res, id);
    } else {
        res.writeHead(404, { 'Content-Type': 'Application/json' });
        res.end(JSON.stringify({ message: 'The Product dose not exit' }));
    }
});

server.listen(3000, () => {
    console.log('listining on port 3000');
});

const http = require('http');
const app = require('./app');
const server = http.createServer(app);
const port = process.env.Port || 4000;
server.listen(port, console.log('app is running on port'));
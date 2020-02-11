// code away!
const server = require('./server.js');

const port = 8000;
server.listen(port, () => console.log(`\n *** api running on port:${port} ***`))
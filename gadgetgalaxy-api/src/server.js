const http= require("http");
const app = require("./app");

require('dotenv').config();

console.log(process.env);
const PORT = process.env.PORT;

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const morgan = require("morgan");
const router = require("./routes/router");

require("dotenv").config();
const port = process.env.PORT || 3001; 
const host = 'localhost';

// cookie parser config
server.use(cookieParser(process.env.COOKIE_SECRET));

// morgan config
server.use(morgan("dev"));

// body-parser config
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

// ejs config
server.set('view engine', 'ejs');
server.set('views', './views');

// static files config
server.use(express.static("public"));
server.use('/assets', express.static('assets'));

// routes config
server.use(router);

// listen the server 
server.listen(port, () => {
    console.log(`> Environment: ${process.env.NODE_ENV}`);
    console.log(`> Server running at ${host}:${port}`);
});

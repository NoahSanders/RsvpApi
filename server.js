const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const util = require('util');

var listen = function() {
    var app = express();
    app.use(cors());
    var port = process.env.PORT || 3000;

    app.use(bodyParser.urlencoded({extended: true }));
    app.use(bodyParser.json());

    var routes = require('./routes/guestRoutes');
    routes(app);

    app.listen(port);
    console.log('API started on ' + port);
};

listen();
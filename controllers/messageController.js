const mysql = require('mysql');
const sanitizer = require('sanitizer');
const login = require('./login.json');
const util = require('util');

exports.create_message = function(request, response) {
    var connection = getConnection();
    request.body.message = sanitizer.sanitize(request.body.message);
    request.body.guest_id = sanitizer.sanitize(request.body.guest_id);

    connection.query('INSERT INTO message SET ?', request.body, (db_error, db_response) => {
        if (db_error) {
            console.log('Error inserting '+ request.body + '-' + db_error.code + ' ' + db_error.message);
            throw err;
        }
        console.log('Inserted message ID ' + db_response.insertId);
        response.status(201).json({"ID": db_response.insertId});
    });

    connection.end((err) => {
        if (err) {
            console.log('Error ending db connection ' + err.code + ' ' + message);
        }
    });
};

function getConnection() {
    const connection = mysql.createConnection(login);
    connection.connect((err) => {
        if (err) {
            console.log('Error connecting to db ' + err.code + ' ' + err.message);
            throw err;
        }
    });
    return connection;
}
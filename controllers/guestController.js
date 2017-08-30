'use strict';
const mysql = require('mysql');
const sanitizer = require('sanitizer');
const login = require('./login.json');

exports.get_all_guests = function(req, res) {
    var connection = getConnection();

    connection.end((err) => {
        console.log('Error ending db connection ' + err.code + ' ' + message);
    });
}

exports.create_guest = function(request, response) {
    var connection = getConnection();

    connection.query('INSERT INTO guest SET ?', request.body, (db_error, db_response) => {
        if (db_error) {
            console.log('Error inserting '+ request.body + '-' + db_error.code + ' ' + db_error.message);
            throw err;
        }
        console.log('Inserted ID ' + db_response.insertId);
        response.status(200).json({"ID": db_response.insertId});
    });

    connection.end((err) => {
        if (err) {
            console.log('Error ending db connection ' + err.code + ' ' + message);
        }
    });
}

exports.get_guest = function(req, res) {
    var connection = getConnection();

    connection.end((err) => {
        console.log('Error ending db connection ' + err.code + ' ' + message);
    });
}
exports.update_guest = function(req, res) {
    var connection = getConnection();

    connection.end((err) => {
        console.log('Error ending db connection ' + err.code + ' ' + message);
    });
}

function getConnection() {
    const connection = mysql.createConnection(login);
    connection.connect((err) => {
        if (err) {
            console.log('Error connecting to db ' + err.code + ' ' + err.message);
            throw err;
        }
        console.log('Connected to db');
    });
    return connection;
}
'use strict';
const mysql = require('mysql');
const sanitizer = require('sanitizer');
const login = require('./login.json');
const util = require('util');

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
    try {
        var connection = getConnection();

        connection.end((err) => {
            console.log('Error ending db connection ' + err.code + ' ' + message);
        });
    }
    catch (exception) {
        console.log("Error updating guest: " + util.inspect(exception));
        if (!response.finished) response.status(500).json(exception);
    }
}

exports.update_guest = function(req, response) {
    try {
        var guestId = req.params.guestId;
        var allowedFields = ['name', 'address_1', 'address_2', 'city', 'state', 'zip_code', 'suggested_guest_count', 'guest_count', 'status', 'last_name'];
        
        if (req.body.id && (req.body.id !== guestId)) {
            response.status(400).json({"message": "Updating the id of a guest is not allowed!"});
            throw {"name": "BadRequestMessage", "source": "update_guest", "message": req.params + req.body};
        }

        for (var field in req.body) {
            if (!allowedFields.includes(field)) {
                response.status(400).json({"message": "Incorrect field name included in request: " + field});
                throw {"name": "BadRequestMessage", "source": "update_guest", "message": req.params + req.body};
            }
        }

        var connection = getConnection();    

        if (req.params.guestId) {
            connection.query('UPDATE guest SET ? WHERE ID = ?', [req.body, parseInt(req.params.guestId)], (db_error, db_response) => {
                if (db_error) throw {"name": "DatabaseError", "source": "update_guest", "message": 'Error updating ID ' + req.params.guestId + ' - '+ req.body + ' - ' + db_error};

                console.log('Updated ID ' + guestId);
                response.sendStatus(200);
            });
        }

        connection.end((err) => {
            if (err) throw {"name": "DatabaseError", "source": "update_guest", "message":'Error ending db connection ' + err};
        });
    }
    catch (exception) {
        console.log("Error updating guest: " + util.inspect(exception));
        if (!response.finished) response.status(500).json(exception);
    }
}

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
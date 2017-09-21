const mysql = require('mysql');
const sanitizer = require('sanitizer');
const login = require('./login.json');
const util = require('util');
const nodemailer = require('nodemailer');

exports.create_message = function(request, response) {
    var connection = getConnection();
    request.body.message = sanitizer.sanitize(request.body.message);
    request.body.guest_id = sanitizer.sanitize(request.body.guest_id);
    if (!request.body.guest_id) {
        let messageBody = 'Name: ' + request.body.custom_name + ', Contact Email: ' + request.body.contact_email + ', Message: ' + request.body.message;
        sendEmail('RSVP Message received', messageBody, login.email_recipients);
    }

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

function sendEmail(subject, body, recipient) {
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: login.sender_email_address,
            pass: login.sender_email_password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let mailOptions = {
        from: login.sender_email_address, 
        to: recipient, 
        subject: subject, 
        text: body 
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.error(util.inspect(error));
        }
        console.log('sent email');
    });
}
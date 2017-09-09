'use strict';
module.exports = function(app) {
    var guests = require('../controllers/guestController.js');

    //guest Routes
    app.route('/guests')
        .get(guests.get_guests)
        .post(guests.create_guest);

    app.route('/guests/:guestId')
        .get(guests.get_guest_by_id)
        .put(guests.update_guest);
}
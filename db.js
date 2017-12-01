var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/carficar');

var User = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    parkinglot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ParkingLot'
    },
    isadmin: Boolean
}, { collection: 'User' }
);

var ParkingLot = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    vacanciesamount: {
        type: Number,
        required: true
    },
    hourprice: {
        type: Number,
        required: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { collection: 'ParkingLot' }
);

var Vehicle = new mongoose.Schema({
    licenseplate: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    color: {
        type: String ,
        required: true
    }
}, { collection: 'Vehicle' }
);

var Parking = new mongoose.Schema({
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true
    },
    parkinglot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ParkingLot',
        required: true
    },
    vacancy: {
        type: Number,
        required: true
    },
    startdate: {
        type: Date,
        required: true
    },
    enddate: {
        type: Date,
        required: true
    }
}, { collection: 'Parking' }
);

module.exports = { Mongoose: mongoose, User: User, ParkingLot: ParkingLot, Vehicle: Vehicle, Parking: Parking }
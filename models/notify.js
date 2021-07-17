const mongoose = require('mongoose');
// random string generate karva mate uuid
const {v1 : uuidv1} = require('uuid') 
// password crypto mate
const crypto = require('crypto');

const notifyschema = new mongoose.Schema({
    notify: [{
        type: String
    }],
})


module.exports = mongoose.model("Notify" , notifyschema);
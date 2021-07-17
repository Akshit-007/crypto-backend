const mongoose = require('mongoose');

const currschema = new mongoose.Schema({
    notify: [{
        type: String
    }]
})


module.exports = mongoose.model("Curr" , currschema);
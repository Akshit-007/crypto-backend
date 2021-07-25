const mongoose = require('mongoose');
// random string generate karva mate uuid
const {v1 : uuidv1} = require('uuid') 
// password crypto mate
const crypto = require('crypto');

const userschema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    fav: [{
        type: String
    }],
    notification: [
        {
            currency: String,
            upper: String,
            lower: String
        }
    ],
    hashed_password: {
        type: String,
        required: true
    },
    salt: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
})

userschema.virtual('password')
.set(function(password)
{
    // _password e temparory variable che
    this._password = password

    this.salt = uuidv1()
    this.hashed_password = this.encryptPassword(password)
})
.get(function()
{
    return this._password
});

userschema.methods =
{
    authenticate: function(plaintext)
    {
        return this.encryptPassword(plaintext) == this.hashed_password
    },
    encryptPassword: function(password)
    {
        if(!password)   return "";
        try     
        {
            return  crypto.createHmac('sha1',this.salt)
                        .update(password)
                        .digest('hex');
        }
        catch(err)  {   return "";  }
    }
}
module.exports = mongoose.model("User" , userschema);
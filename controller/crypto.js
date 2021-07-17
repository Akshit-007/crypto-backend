const User = require('../models/user');
const Notify = require('../models/notify');


exports.addToFav = (req, res, next) => {
    const curr = req.body.curr
    User.findById(req.profile._id)
    .then(user => {
        user.fav.push(curr)
        return user.save()
    })
    .then(result => {
        res.status(200).json({
            message: "Success"
        })
    })
    .catch(err => {
        res.status(500).json({
            error: "Server error"
        })
    })
}


exports.getFav = (req, res, next) => {
    User.findById(req.profile._id)
    .then(user => {
        let cString="",new1="";
        user.fav.forEach(c => {
            cString = new1.concat(c , ',');
            new1=cString;
        })
        res.status(200).json({
            message: "Success",
            fav: cString
        })
    })
    .catch(err => {
        res.status(500).json({
            error: "Server error"
        })
    })
}


exports.postNotify = (req, res) => {
    const notify = req.body
    User.findById(req.profile._id)
    .then(user => {
        user.notification.push(notify)
        return user.save()
    })
    .then(result => {
        res.status(200).json({
            message: "Success"
        })
    })
    .catch(err => {
        res.status(500).json({
            error: "Server error"
        })
    })
}
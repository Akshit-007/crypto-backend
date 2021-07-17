const User = require('../models/user');
const Curr = require('../models/curr');


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
            let cString = "", new1 = "";
            user.fav.forEach(c => {
                cString = new1.concat(c, ',');
                new1 = cString;
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
    const curr = req.body.currency
    User.findById(req.profile._id)
        .then(user => {
            user.notification.push(notify)
            return user.save()
        })
        .then(() => {
            Curr.findById("60f26f8c80d75fda8e757b1a")
                .then(data => {
                    if (data.notify.length === 0) {
                        data.notify.push(curr)
                        return data.save()
                    }
        
                    const arr = data.notify
                    const ind = arr.findIndex(c => {
                        return c.toString() === curr.toString()
                    })
                    if (ind === -1) {
                        data.notify.push(curr)
                    }
                    return data.save()
                })
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
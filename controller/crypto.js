const User = require('../models/user');
const Curr = require('../models/curr');

exports.removeSub = (req, res, next) => {
    User.findById(req.profile._id)
        .then(user => {
            user.sub = false
            user.save()
                .then(result => {
                    res.status(201).json({
                        message: "Success",
                    })
                })
        })
        .catch(err => {
            res.status(500).json({
                error: "Server error"
            })
        })
}

exports.getSub = (req, res, next) => {
    User.findById(req.profile._id)
        .then(user => {
            if (user.sub == true) {
                return res.status(200).json({
                    sub: true,
                    subemail: user.subemail
                })
            }
            res.status(200).json({
                sub: false,
                subemail: ""
            })
        })
        .catch(err => {
            res.status(500).json({
                error: "Server error"
            })
        })
}

exports.addSub = (req, res, next) => {
    const subemail = req.body.sub
    User.findById(req.profile._id)
        .then(user => {
            user.subemail = subemail
            user.sub = true
            user.save()
                .then(result => {
                    res.status(201).json({
                        message: "Success",
                    })
                })
        })
        .catch(err => {
            res.status(500).json({
                error: "Server error"
            })
        })
}


exports.addToFav = (req, res, next) => {
    const curr = req.body.curr
    User.findById(req.profile._id)
        .then(user => {
            const ind = user.fav.findIndex(c => {
                return c.toString() === curr.toString()
            })
            if (ind != -1) {
                return res.status(200).json({
                    message: "Already Added :)",
                    check: true
                })
            }
            user.fav.push(curr)
            user.save()
                .then(result => {
                    res.status(200).json({
                        message: "Success",
                        check: false
                    })
                })
        })
        .catch(err => {
            res.status(500).json({
                error: "Server error"
            })
        })
}

exports.removeFromFav = (req, res, next) => {
    const curr = req.body.curr
    let favCrypto = []
    User.findById(req.profile._id)
        .then(user => {
            favCrypto = user.fav.filter(c => c != curr)
            user.fav = favCrypto
            return user.save()
        })
        .then(result => {
            res.status(201).json({
                message: "remove currency from favourite"
            })
        })
        .catch(err => {
            res.status(500).json({
                error: "Server error where remove from favourite"
            })
        })
}


exports.getFav = (req, res, next) => {
    User.findById(req.profile._id)
        .then(user => {
            if (user.fav.length == 0) {
                return res.status(200).json({
                    message: "Success",
                    check: true,
                    fav: "No Favorites"
                })
            }
            let cString = "", new1 = "";
            user.fav.forEach(c => {
                cString = new1.concat(c, ',');
                new1 = cString;
            })

            res.status(200).json({
                message: "Success",
                check: false,
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
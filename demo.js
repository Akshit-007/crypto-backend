var cron = require('node-cron');
const Curr = require('./models/curr');
const User = require('./models/user');
const fetch = require('node-fetch');
const { forEach } = require('lodash');

const nodeMailer = require("nodemailer");
const defaultEmailData = { from: "noreply@node-react.com" };

const sendEmail = emailData => {
    const transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: "sahildabhi48@gmail.com",
            pass: "ispmnqlzijyfzgll"
        }
    });
    return (
        transporter
            .sendMail(emailData)
            .then(info => console.log(`Message sent: ${info.response}`))
            .catch(err => console.log(`Problem sending email: ${err}`))
    );
};


const fetchFav = (fav) => {

    const API = `https://api.nomics.com/v1/currencies/ticker?key=d6086cf0c1b8779ec879a4282a41c55ed2e070e2&ids=${fav}&interval=1d,30d`

    return fetch(API, {
        method: "GET"
    })
    .then((response) => response.json())
    .catch(err => {
        console.log(err)
    })
}
cron.schedule('*/1000 * * * *', () => {
// cron.schedule("*/20 * * * * *", () => {
    let cString = "", new1 = "", arrnoti=[], userL = [];
    Curr.findById("60f26f8c80d75fda8e757b1a")
        .then(data => {
            data.notify.forEach(c => {
                cString = new1.concat(c, ',');
                new1 = cString;
            })
            return cString
        })
        .then(string => {
            return fetchFav(string)
            .then(data => {
                arrnoti = data.map(i => {
                    return {
                        currency: i.currency,
                        price: i.price
                    }
                }) 
                return arrnoti
            })
        })
        .then(data => {
            return User.find({}, {notification: 1, email: 1, name: 1})
            .then(users => {
                userL = users
                return userL
            })
        })
        .then(data => {
            // console.log(arrnoti)
            userL.forEach(u => {
                u.notification.forEach(n => {
                    arrnoti.forEach(i => {
                        if(i.currency === n.currency) {
                            if(n.lower > i.price)
                            {
                                console.log("lower value" , n.lower , u.name)
                                
                                const emailData = {
                                    from: 'noreply@node-react.com',
                                    to: u.email,
                                    subject: 'Notification Crypto',
                                    text: `your notified crypto price for ${n.currency} decreased than your notified value ${n.lower} and now its value is ${i.price}`
                                };
                                
                                sendEmail(emailData)
                                
                            }
                            else if(n.upper < i.price)
                            {
                                console.log("upper value", n.upper, u.name)
                                const emailData = {
                                    from: 'noreply@node-react.com',
                                    to: u.email,
                                    subject: 'Notification Crypto',
                                    text: `your notified crypto price for ${n.currency} increased than your notified value ${n.upper} and now its value is ${i.price}`
                                };
                                
                                sendEmail(emailData)
                            }
                        }
                    })
                })
            })
        })
        .catch(err => {
            console.log(err)
        })
});







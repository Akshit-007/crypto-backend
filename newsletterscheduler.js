var cron = require('node-cron');
const User = require('./models/user');
const axios = require("axios")
const fetch = require('node-fetch');

const nodeMailer = require("nodemailer");
const user = require('./models/user');
const defaultEmailData = { from: "noreply@node-react.com" };

const sendEmail = emailData => {
    const transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: "badshah08152@gmail.com",
            pass: "86jayyoawoa86"
        }
    });
    return (
        transporter
            .sendMail(emailData)
            .then(info => console.log(`Message sent: ${info.response}`))
            .catch(err => console.log(`Problem sending email: ${err}`))
    );
};

// let removeByteOrderMark = a=>a[0]=="\ufeff"?a.slice(1):a
// const fetchFav = (fav) => {

//     const API = `https://api.nomics.com/v1/currencies/ticker?key=d6086cf0c1b8779ec879a4282a41c55ed2e070e2&ids=${fav}&interval=1d,30d`

//     return fetch(API, {
//         method: "GET"
//     })
//     .then(res => {
//         return removeByteOrderMark(res)
//     })
//     .then((response) => response.json())
//     .catch(err => {
//         console.log(err)
//     })
// }

const fetchFav = (fav) => {

    const API = `https://api.nomics.com/v1/currencies/ticker?key=a851a803ade4ce9285f29ece2e0aa2c63ecf067f&ids=${fav}&interval=1d,30d`

    return axios.get(API)
    .then((response) => response.data)
    .catch(err => {
        console.log(err)
    })
}


// cron.schedule("*/10 * * * * *", () => {
cron.schedule("0 0 * * *", () => {
    let cString = "", new1 = "", favArr=[], userList;
    User.find()
    .then(users => {
        userList = users
        users.forEach(user => {
            if(user.sub == true && user.fav.length > 0) {
                user.fav.forEach(currency => {
                    cString += new1.concat(currency, ',');
                    new1 = cString;
                })
            }
            new1 = ""
        })
        // console.log(cString)
        return cString
    })
    .then(currString => {
        if(currString == "") {
            return 
        }
        console.log(currString)
        return fetchFav(currString)
        .then(data => {
            console.log(data)
            favArr = data
            return favArr
        })
    })
    .then(currArr => {
        if(cString == "") {
            console.log("No Data")
            return 
        }
        userList.forEach(user => {
            let htmlC = ""
            if(user.sub == true && user.fav.length > 0) {
                user.fav.forEach(cur => {
                    currArr.forEach(favcur => {
                        if(favcur.currency == cur) {
                            htmlC += `<h3>Details of ${favcur.name}<h3><br><p>Price as of now is $ ${favcur.price} and its price change compare to yesterday is $ ${favcur['1d'].price_change} its about ${favcur['1d'].price_change_pct} % </p><br>`
                        }
                    })
                })
                const emailData = {
                    from: '"noreply@node-react.com" <parthsorathiya4567@gmail.com>',
                    to: user.subemail,
                    subject: 'Newsletter of your Favorite Crypto Currencies',
                    html: htmlC
                };
                sendEmail(emailData)
            }
        })
    })
    .catch(err => console.log(err))
})


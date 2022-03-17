const Quizz = require('../models/Quizz');
const Sub = require('../models/Sub');
const webpush = require('web-push');

webpush.setVapidDetails(
    'mailto:josu9513@gmail.com',
    process.env.publicKey,
    process.env.privateKey
);

class QuizzCode {

    async generate() {
        const todaysCodes = [];
        for(let i = 0; i < 7; i++) {
            let currentCode = '';
            for(let index = 0; index < 7; index++) {
                const randomNum = Math.floor(Math.random() * (9 - 0 + 1) + 0);
                currentCode += randomNum;
            }
            todaysCodes.push(currentCode);
        }
        const newItem = await Quizz.create({ codes: todaysCodes, date: new Date() });
        console.log(newItem);
	}

    async sendNewsletter() {
        const allSubscriptions = await Sub.find();
        const notificationPayload = {
            "notification": {
                "title": "Quizz Game",
                "body": "New quizz available",
                "icon": "assets/main-page-logo-small-hat.png",
                "vibrate": [100, 50, 100],
                "data": {
                    "dateOfArrival": Date.now(),
                    "primaryKey": 1
                },
                "actions": [{
                    "action": "explore",
                    "title": "Go to the site"
                }]
            }
        };
    
        Promise.all(allSubscriptions.map(sub => webpush.sendNotification(
            sub, JSON.stringify(notificationPayload) )))
            .then(() => console.log("Message sent"))
            .catch(err => {
                console.error("Error sending notification, reason: ", err);
            });
    }
}

module.exports = new QuizzCode();

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
        console.log(todaysCodes);
        const newItem = await Quizz.create({ codes: todaysCodes, date: new Date(), disorderCodes: this.disorderArray([...todaysCodes]) });
        console.log(newItem);
	}

    disorderArray(arr) {
        const codes = arr.join('').split('');
        console.log(codes);
        let currentIndex = codes.length;
        const res = [];
    
        while (currentIndex !== 0) {
          const randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          [codes[currentIndex], codes[randomIndex]] = [
            codes[randomIndex], codes[currentIndex]];
        }
        for(let i = 0; i < codes.length; i ++) {
          const actualPosition = i * 7;
          res.push(codes.slice(actualPosition, actualPosition + 7).join(''));
        }
        console.log(res.filter( ar => ar));
        return res.filter( ar => ar);
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

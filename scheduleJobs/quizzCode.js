const Quizz = require('../models/Quizz');

class QuizzCode {
    async generate() {
        let todaysCode = '';
        for(let index = 0; index < 5; index++) {
            const randomNum = Math.floor(Math.random() * (9 - 0 + 1) + 0);
            todaysCode += randomNum;
        }
        const newItem = await Quizz.create({ code: todaysCode, date: new Date() });
        console.log(newItem);
	}
}

module.exports = new QuizzCode();

// export const createCode = () => {
//     let todaysCode = '';
//     for(let index = 0; index < 5; index++) {
//         const randomNum = Math.floor(Math.random() * (9 - 0 + 1) + 0);
//         todaysCode += randomNum;
//     }
//     const newItem = await Quizz.create({ code: todaysCode, date: new Date() });
//     console.log(newItem);
// };

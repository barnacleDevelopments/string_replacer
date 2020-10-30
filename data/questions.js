const Question = require("../classes/Question")

let i
let questions = []

for(i = 0; i < 5; i++) {
   questions.push(new Question("number", `Enter hours worked on Day #${i + 1}`))
}

module.exports = questions
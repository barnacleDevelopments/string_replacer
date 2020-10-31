/*
==========================================
Assignment_3: Program 2
Author: Devin Davis
Date: October 30th, 2020
File: app.js
===========================================
*/

const readlineSync = require("readline-sync");
const chalk = require("chalk");
const questions = require("./data/questions");

// log an input error to console
const logInputErr =(err) => {
  console.log(`\n\n${chalk.red(err)}`);
}

// function validate anwser type
const validateType = (anwser, expectType) => {
  if (expectType === "number") {
    return isNaN(anwser);
  }

  if (expectType === "string") {
    return !isNaN(anwser);
  }
};

/**
 *   @param {object} question a single question 
 */
// function - ask question
const askQuestion = (question) => {
  let anwser = readlineSync.question(question.name);
  if(anwser.toLocaleLowerCase() === "quit") {
    console.clear()
    process.exit()
  }
  return anwser;
};

/**
 *   @param {array} questions Array of questions
 */

// function ask a set of questions
const askQuestions = (questions, func) => {
  let anwsers = {}
  questions.forEach((q) => {
    let anwser = askQuestion(q);
   
    // check if no anwser was provided
   while(anwser === "") {
    logInputErr("0 is not an anwser!")
    anwser = askQuestion(q)
   }

    // check if string was provided
   if(q.type === "string")
   while(validateType(anwser, "string")) {
     logInputErr("That is not an string!")
    anwser = askQuestion(q)
   }
 
   anwsers[q.propName] = anwser
  });
  func(anwsers);
  askQuestions(questions, logResults)
};

/**
 * @param {string} letterString enter string of letters to convert to array
 */
// convert a string into an array
const strToArr = (letterString) => {
  let newString
  newString = letterString.split(",")
  return newString
}

/**
 * @param {string} phrase enter a string to redact
 * @param {string} symbole enter a string to use as replacement 
 * @param {array} replacers array of strings to be replaced
 */

 // replace string portions 
const redactStr = (phrase, symbole, replacers) => {
  let i 
  let phraseLength = phrase.length
  let newPhrase = phrase.toLowerCase()
  let redactCount = 0

  replacers.forEach(str => {
    for(i = 0; i < phraseLength; i++) {
      if(phrase[i].toLowerCase() === str.toLowerCase()) {
        redactCount ++
        newPhrase = newPhrase.replace(str.toLowerCase(), symbole) 
      } else if(validateType(str, "number")) {
        redactCount ++
        newPhrase = newPhrase.replace(str, symbole) 
      }
    } 
  })
  return {
    phrase: newPhrase,
    redactCount: redactCount
  }
}

/**
 * @param {object} anwsers containing anwsers
 */
const logResults = (anwsers) => {
  let redactInfo = redactStr(anwsers.phrase, anwsers.symbole, strToArr(anwsers.replacers))
  console.log(`\n${chalk.bold.yellow("Redacted phrase: ")} ${redactInfo.phrase}`)
  console.log(`\n${chalk.bold.yellow("Number of letters redacted: ")} ${redactInfo.redactCount}`)
}

// log output to console
askQuestions(questions, logResults)
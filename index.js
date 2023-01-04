import chalk from 'chalk';
import { appendFile, readFile, writeFile } from "node:fs/promises";
import { readSync, closeSync, openSync } from "node:fs";
import { createInterface } from 'node:readline/promises';
import { questions } from './constants.js';

let lineWidth = 0; //containing the character number of a line
let idsJson = {}; //containing the indexes jsonObject

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function loadIdsJson() { //load the ids indexes in the background 
    readFile("indexes.json", "utf8")
        .then((res) => idsJson = JSON.parse(res)) //put ids indexes in idsJson
        .catch(() => writeFile('indexes.json', "{}")); //if file not exists create it
}

async function setLineWidth() { //set the character number of a line in the background
    questions.forEach(question => {
        lineWidth += question.key.length; //add key length
        lineWidth += question.maxLength; //add value max length
        lineWidth += 5; //add two quotation marks of key, two quotation marks of value and one colon
    });
    lineWidth += questions.length; //add comas  
    lineWidth += 2; //add parenthesis
}

async function start() { //the main menu
    let answer = await rl.question(chalk.blue("Choose option:") + " \n1. Create employee \n2. Load employee \n3. Update employee \n4. Delete employee \n" + chalk.magenta("answer: "));
    switch (answer) {
        case "1":
            createEmployee();
            break;
        case "2":
            readEmployee();
            break;
        case "3":
            updateEmpolyee();
            break;
        case "4":
            deleteEmployee();
            break;
        default:
            console.log(chalk.red("\nwrong input, try again.\n"));
            start()
            break;
    }
}

async function createEmployee() {
    console.log(chalk.blue("\nCreating employee"));
    let employee = {}; //creating empty employee object
    for (let i = 0; i < questions.length; i++) { //iterate over question object
        let question = questions[i];
        let answer = await rl.question(question.questionText + "\n" + chalk.magenta("answer: ")); //ask the user the question
        if (question.validator(answer)) { //check if the answer passed the validator
            if (question.key === "id" && idsJson[answer] !== undefined) { //if the question is about the employee id, check if id already exists
                console.log(chalk.red("This id already exists, enter new id"));
                i--; //if id exists in the ids index, ask for another id
            } else employee[question.key] = answer.padEnd(question.maxLength); //add spaces to the value for making every line the same width
        }
        else {
            console.log(chalk.red(question.errorMessageText)); //show error if input is incorrect
            i--; //if input is invalid ask for another input
        }
    }
    const employeeData = JSON.stringify(employee); //make the employee object text
    await appendFile('employees.txt', `${employeeData}\n`); //append the new object to the file
    addEmployeeIndex(employee.id); //add index for the new line in the indexes json
    console.log(chalk.green("\nSuccess, adding an employee.\n"));
    start(); //start main menu again
}

async function readEmployee() {
    console.log(chalk.blue("\nLets load employee"));
    let id = await rl.question("Enter employee id\n" + chalk.magenta("answer: "));
    if (id.length == 9 && !isNaN(id)) { //check if id is valid
        let lineNumber = idsJson[id]; //get the line number from the json index
        if (lineNumber !== undefined) { //continue only if the id exists
            let file = openSync("employees.txt", "r");
            let position = lineWidth * (lineNumber - 1); //set the reading file start position
            let buffer = Buffer.alloc(lineWidth);
            let bytesRead = readSync(file, buffer, 0, lineWidth, position); //read from position and stops after lineWidth number of characters
            closeSync(file);
            let text = buffer.toString("utf8", 0, bytesRead);
            let employee = JSON.parse(text); 
            Object.keys(employee).forEach(key => employee[key] = employee[key].trim()); //remove all empty spaces from the object values
            console.log(chalk.green("\nEmployee loaded successfully\nResult: "));
            console.log(employee);
            console.log();
            start();
        }
        else {
            console.log(chalk.red("This id is not exists, enter new id"));
            readEmployee(); //if id is not exist ask the user for another
        }
    }
    else {
        console.log(chalk.red("Input error, Id must be a number with 9 digits."));
        readEmployee(); //if the input is invalid ask the user for another
    }
}

async function updateEmpolyee() { //TODO
    let id = await rl.question("\nEnter employee id ");
    if (id.length == 9 && !isNaN(id)) {
        let lineNumber = idsJson[id];
        if (lineNumber !== undefined) {
            let file = openSync("employees.txt", "r");
            let line = idsJson[id];
            let position = lineWidth * (line - 1);
            let buffer = Buffer.alloc(lineWidth);
            let bytesRead = readSync(file, buffer, 0, lineWidth, position);
            closeSync(file);
            let text = buffer.toString("utf8", 0, bytesRead);
            let employee = JSON.parse(text);
            Object.keys(employee).forEach(key => employee[key] = employee[key].trim());
            console.log("Result: ");
            console.log(employee);
            console.log("\nChoose what do you want to change:");
            for (let i = 1; i < questions.length; i++) {
                const question = questions[i];
                console.log(`${i}. ${question.key}`);
            }

        }
        else {
            console.log("This id is not exists, enter new id");
            readEmployee();
        }
    }
    else {
        console.log("Input error, Id must be a number with 9 digits.");
        readEmployee();
    }
}

async function deleteEmployee() {
    console.log(chalk.blue("\nLets delete employee"));
    let id = await rl.question("Enter employee id\n" + chalk.magenta("answer: "));
    if (id.length == 9 && !isNaN(id)) { //continue if the input is correct
        let lineNumber = idsJson[id];
        if (lineNumber !== undefined) { //if the id exists in the index, delete the index
            deleteEmployeeIndex(id);
        }
        else {
            console.log(chalk.red("This id is not exists, enter new id")); 
            deleteEmployee(); //if the id is not exists ask for another
        }
    }
    else {
        console.log(chalk.red("Input error, Id must be a number with 9 digits."));
        deleteEmployee(); //if the input is incorrect  ask for another
    }
}

async function addEmployeeIndex(id) {
    idsJson[id] = Object.keys(idsJson).length + 1; //add field to the index object with the id as key and the value is the number of keys + 1
    writeFile('indexes.json', JSON.stringify(idsJson));
}

async function deleteEmployeeIndex(id) {
    idsJson[idsJson[id]] = idsJson[id];
    delete idsJson[id];
    writeFile('indexes.json', JSON.stringify(idsJson));
    console.log(chalk.green("\nEmployee deleted\n"));
    start();
}

loadIdsJson();
setLineWidth();
start();
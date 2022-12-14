import { appendFile } from "node:fs/promises";
import readline from 'node:readline/promises';
import { questions } from './constants.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function addNewEmployee(questions) {
    let employee = {};
    for (let i = 0; i < questions.length; i++) {
        let question = questions[i];
        let answer = await rl.question("\n" + question.questionText + " ");
        if (question.validator(answer)) employee[question.key] = answer;
        else {
            console.log(question.errorMessageText);
            i--;
        }
    }
    rl.close();
    const employeeData = JSON.stringify(employee);
    await appendFile('employees.txt', `\n${employeeData}`);
}

addNewEmployee(questions);

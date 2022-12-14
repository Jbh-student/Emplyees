export const questions = [
    {
        "questionText": "What is your first name?",
        "errorMessageText": "Input error, first name can contain between 2 and 30 characters.",
        "key": "firstName",
        "validator": (input) => {
            return input.length > 1 && input.length < 31;
        }
    },
    {
        "questionText": "What is your last name?",
        "errorMessageText": "Input error, last name can contain between 2 and 30 characters.",
        "key": "lastName",
        "validator": (input) => {
            return input.length > 1 && input.length < 31;
        }
    },
    {
        "questionText": "What is your id?",
        "errorMessageText": "Input error, Id must be a number with 9 digits.",
        "key": "id",
        "validator": (input) => {
            return input.length == 9 && !isNaN(input);
        }
    },
    {
        "questionText": "What is your age?",
        "errorMessageText": "Input error, age must be a positive number.",
        "key": "age",
        "validator": (input) => {
            return !isNaN(input) && input > 0;
        }
    },
    {
        "questionText": "Which city do you live?",
        "errorMessageText": "Input error, city name can contain between 2 and 30 characters.",
        "key": "city",
        "validator": (input) => {
            return input.length > 1 && input.length < 31;
        }
    },
    {
        "questionText": "Which street do you live?",
        "errorMessageText": "Input error, street name can contain between 2 and 30 characters.",
        "key": "street",
        "validator": (input) => {
            return input.length > 1 && input.length < 31;
        }
    },
    {
        "questionText": "What is your house number?",
        "errorMessageText": "Input error, house number must be a positive number.",
        "key": "houseNumber",
        "validator": (input) => {
            return !isNaN(input) && input > 0;
        }
    },
    {
        "questionText": "Do you work fullTime? (yes or no)",
        "errorMessageText": "Input error, answer must be yes or no.",
        "key": "fullTime",
        "validator": (input) => {
            return input.toLowerCase() === 'yes' || input.toLowerCase() === 'no';
        }
    }
];
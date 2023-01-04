import validator from 'validator';

export const questions = [
    {
        "questionText": "Enter employee id",
        "errorMessageText": "Input error, Id must be a number with 9 digits.",
        "key": "id",
        "maxLength": 9,
        "validator": (input) => {
            return input.length == 9 && !isNaN(input);
        }
    },
    {
        "questionText": "Enter first name",
        "errorMessageText": "Input error, first name can contain between 2 and 30 characters.",
        "key": "firstName",
        "maxLength": 30,
        "validator": (input) => {
            return input.length > 1 && input.length < 31;
        }
    },
    {
        "questionText": "Enter last name",
        "errorMessageText": "Input error, last name can contain between 2 and 30 characters.",
        "key": "lastName",
        "maxLength": 30,
        "validator": (input) => {
            return input.length > 1 && input.length < 31;
        }
    },
    {
        "questionText": "Enter birth date (dd/mm/yyyy)",
        "errorMessageText": "Input error, birth date must be valid date in this format - dd/mm/yyyy.",
        "key": "birthDate",
        "maxLength": 10,
        "validator": (input) => {
            return validator.isDate(input, { format: "dd/mm/yyyy", strictMode: true, delimiters: ['/']}); 
        }
    },  
    {
        "questionText": "Enter city",
        "errorMessageText": "Input error, city name can contain between 2 and 30 characters.",
        "key": "city",
        "maxLength": 30,
        "validator": (input) => {
            return input.length > 1 && input.length < 31;
        }
    },
    {
        "questionText": "Enter street",
        "errorMessageText": "Input error, street name can contain between 2 and 30 characters.",
        "key": "street",
        "maxLength": 30,
        "validator": (input) => {
            return input.length > 1 && input.length < 31;
        }
    },
    {
        "questionText": "Enter house number",
        "errorMessageText": "Input error, house number must be a positive number with maximum 5 digits.",
        "key": "houseNumber",
        "maxLength": 5,
        "validator": (input) => {
            return !isNaN(input) && input < 100000 && input > 0;
        }
    }
];
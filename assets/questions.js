const connection = require("../config/connection");
const inquirer = require("inquirer");
const orm = require("../config/orm");


let namesArr = [];
let rolesArr = [];
let deptArr = [];


getEmployeeNames();
getRoles();
getDepartmentNames();


module.exports = questions = {
    main: {
        type: "list",
        name: "main",
        message: "What would you like to do?",
        choices: [
            "View all employees",
            "View all departments",
            "View all roles",
            "Add employee",
            "Add department",
            "Add role",
            "Update employee"

        ]
    },

    addEmployee: [
        {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?"
        },
        {
            type: "list",
            name: "role_id",
            message: "What is the employee's role?",
            choices: rolesArr

        },
        {
            type: "list",
            name: "manager_id",
            message: "Who is the employee's manager?",
            choices: namesArr

        }

    ],

    addDepartment: {

        type: "input",
        name: "name",
        message: "What is the name of the new department?"
    },

    addRole: [

        {
            type: "input",
            name: "title",
            message: "What is the title of the new role?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary of this role?"
        },
        {
            type: "list",
            name: "department_id",
            message: "To which department does this role belong?",
            choices: deptArr
        }
    ]




}

// get a list of roles
function getRoles () {
    connection.query(`SELECT title FROM role;`)
        .then(result => {

            for (let i = 0; i < result.length; i++) {
                rolesArr.push(result[i].title);
            }
            rolesArr.push(new inquirer.Separator());
            // return rolesArr;

        })
        .catch(err => err);
};

// get a list of the employee names
function getEmployeeNames () {
    connection.query(`SELECT first_name, last_name FROM employee;`)
        .then(result => {

            for (let i = 0; i < result.length; i++) {
                namesArr.push(result[i].first_name + " " + result[i].last_name);
            }
            namesArr.push(new inquirer.Separator());
            //    return namesArr;

        })
        .catch(err => err);
};

function getDepartmentNames () {
    connection.query(`SELECT name FROM department;`)
    .then(result => {

        for (let i = 0; i < result.length; i++) {
            deptArr.push(result[i].name);
        }
        deptArr.push(new inquirer.Separator());
    });

};

// test

// inquirer.prompt(questions.main)
//     .then(response => {
//         console.log(response)
//     })
//     .then(connection.end())
//     .catch(err => err);
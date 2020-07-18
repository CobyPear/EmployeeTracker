const { updateEmployee } = require("../config/orm");

module.exports = {
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
    addEmployee: (roles, managers) => [

        {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?",
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
            choices: roles
        },
        {
            type: "list",
            name: "manager_id",
            message: "Who is the employee's manager?",
            choices: managers

        }

    ],

    addDepartment: {

        type: "input",
        name: "name",
        message: "What is the name of the new department?"
    },

    addRole: (deptArr) => [

        {
            type: "input",
            name: "title",
            message: "What is the title of the new role?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary of this role (no commas please)?"
        },
        {
            type: "list",
            name: "department_id",
            message: "To which department does this role belong?",
            choices: deptArr
        }
    ],

    updateEmployee: (employees) => [
        {
            type: "list",
            name: "id",
            message: "Who would you like to update?",
            choices: employees
        }
    ],

    updateEmployeeCont: (firstName, lastName, roles, managers) => [

        {
            type: "input",
            name: "first_name",
            default: firstName,
            message: "What is the employee's updated first name?",
        },
        {
            type: "input",
            name: "last_name",
            default: lastName,
            message: "What is the employee's updated last name?"
        },
        {
            type: "list",
            name: "role_id",
            message: "What is the employee's updated role?",
            choices: roles
        },
        {
            type: "list",
            name: "manager_id",
            message: "Who is the employee's updated manager?",
            choices: managers

        },
        {
            type: "confirm",
            name: "is_manager",
            message: "Is this employee a manager?"

        }

    ]

    //TODO: update employee roles, BONUS: view employees by manager, update employee manager, delete departments, roles, and employees, combined salary

};

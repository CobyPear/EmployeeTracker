/*
 Build a command-line application that at a minimum allows the user to:

  * Add departments, roles, employees -C

  * View departments, roles, employees- R

  * Update employee roles - U

  Bonus points if you're able to:

  * Update employee managers

  * View employees by manager

  * Delete departments, roles, and employees

  * View the total utilized budget of a department -- ie the combined salaries of all employees in that department

  user story:
  As a business owner
    I want to be able to view and manage the departments, roles, and employees in my company
    So that I can organize and plan my business

 */
const cTable = require("console.table");
const orm = require("./config/orm");
const connection = require("./config/connection");
const inquirer = require("inquirer");
const questions = require("./assets/questions");
// const { addDepartment } = require("./config/orm");
// const { managerSwitcher } = require("./config/orm");
// const { addEmployee } = require("./config/orm");


// starts the program
const init = () => {

    return inquirer.prompt(questions.main)
        .then(async ({ main }) => {

            switch (main) {
                case "View all employees":
                    await renderAllEmployees();
                    break;
                case "View all departments":
                    await renderAllDepartments();
                    break;
                case "View all roles":
                    await renderAllRoles();
                    break;
                case "Add employee":
                    await addEmployee();
                    break;
                case "Add department":
                    await addDepartment();
                    break;
                case "Add role":
                    await addRole();
                    break;


                default: console.log("bleh");
                    break;
            };
        })
        .catch(err => console.error(err));
};

// renders all employees to the console
const renderAllEmployees = () => {
    return orm.viewAllEmployee()
        .then(result => console.table(result))
        .catch(err => console.error(err))
        .then(init);
};

// renders all departments to the console
const renderAllDepartments = () => {
    return orm.viewAllDepartments()
        .then(result => console.table(result))
        .catch(err => console.error(err))
        .then(init);
};

// renders all roles to the console
const renderAllRoles = () => {
    return orm.viewAllRoles()
        .then(result => console.table(result))
        .catch(err => console.error(err))
        .then(init);
};

// asks the add employee prompts to insert a new employee into the database
const addEmployee = () => {
    inquirer
        .prompt(questions.addEmployee)
        .then(async result => {
            let role = await roleSwitch(result.role_id)
            let manager = await managerSwitch(result.manager_id.split(" ")[0])

            orm.addEmployee(result.first_name, result.last_name, role, manager);
        })
        .catch(err => console.err(err))
        .then(init);

};

const addDepartment = () => {
    inquirer
        .prompt(questions.addDepartment)
        .then(async result => await orm.addDepartment(result.name))
        .catch(err => err)
        .then(init);
};

const addRole = () => {
    inquirer
        .prompt(questions.addRole)
        .then(async result => {
            let dept = await deptSwitch(result.department_id)
            orm.addRole(result.title, result.salary, dept)
        })
        .catch(err => console.error(err))
        .then(init);
};

// takes in the role name, outputs the role's id
const roleSwitch = (role) => {
    return orm.roleSwitcher(role)
        .then(res => res[0].id)
        .catch(err => console.error(err));
};

// takes in the manager name, outputs the manager's id
const managerSwitch = (manager) => {
    return orm.managerSwitcher(manager)
        .then(res => res[0].id)
        .catch(err => console.error(err));
};

// takes in the department name, outputs the department id
const deptSwitch = (dept) => {
    return orm.deptSwitcher(dept)
        .then(res => res[0].id)
        .catch(err => console.error(err));
};

init();
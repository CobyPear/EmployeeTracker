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
                case "View all managers":
                    await renderAllManagers();
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
                case "Update employee":
                    await updateEmployee();
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

const renderAllManagers = () => {
    return orm.viewManagers()
        .then(result => console.table(result))
        .catch(err => console.error(err))
        .then(init);
};


// asks the add employee prompts to insert a new employee into the database
const addEmployee = async () => {
    try {
        const managers = await orm.viewManagersINQ();
        const roles = await orm.viewRolesINQ();
        const result = await inquirer.prompt(questions.addEmployee(roles, managers))
        await orm.addEmployee(result.first_name, result.last_name, result.role_id, result.manage_id)
        await init();
    } catch (error) {
        console.log(error.message);
    }
};

const addDepartment = async () => {
    try {
        const result = await inquirer.prompt(questions.addDepartment);
        await orm.addDepartment(result.name);
        await init();
    } catch (error) {
        console.error(error.message);
    };
};

const addRole = async () => {
    try {
        const dept = await orm.viewDepartmentINQ();
        const result = await inquirer.prompt(questions.addRole(dept));
        await orm.addRole(result.title, result.salary, result.department_id);
        await init();
        
    } catch (error) {
        console.error(error.message);
    };
};

const updateEmployee = async () => {
    try {
        const employees = await orm.viewEmployeeINQ();
        const defaultNames = await inquirer.prompt(questions.updateEmployee(employees
            ));
        const firstName = await orm.employeeFirstNameINQ(defaultNames.id);
        const lastName = await orm.employeeLastNameINQ(defaultNames.id);
        const roles = await orm.viewRolesINQ();
        const managers = await orm.viewManagersINQ();
        const result = await inquirer.prompt(questions.updateEmployeeCont(firstName[0].first_name, lastName[0].last_name, roles, managers));
        await orm.updateEmployee(result.first_name, result.last_name, result.role_id, result.manager_id, result.is_manager, defaultNames.id);
        await init();
        
    } catch (error) {
        console.error(error.message);
    };
};

init();
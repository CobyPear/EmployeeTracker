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

orm.viewAllEmployee()
.then(results=> console.table(results))
.then(connection.end())
.catch(err => console.error(err));

 // inquierer prompts
    // what would you like to do? (list answer)
        /*
        view all employees - select needed
        view all employees by department- bonus
        view all employees by manager -bonus
        add employee
        update employee role
        update employee manager

        
         */
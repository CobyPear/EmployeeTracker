// import MySQL connection
const connection = require("../config/connection");

// ORM class to neatly hold all of our SQL query functions
class ORM {
    constructor(connection) {
        this.connection = connection;
    };

    // Helper function for SQL syntax.
    // Let's say we want to pass 3 values into the mySQL query.
    // In order to write the query, we need 3 question marks.
    // This helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
    // ["?", "?", "?"].join(', ') => "?, ?, ?";
    printQuestionMarks(numberOfValues) {
        const questionMarks = [];

        for (var i = 0; i < numberOfValues; i++) {
            questionMarks.push("?");
        }

        return questionMarks.join(', ');
    };

    // create a method that returns role id, and accepts in the role name.
    roleSwitcher(title) {
        const queryString = `SELECT id FROM role WHERE title = ?`

        return this.connection.query(queryString, [title]);

    };

    // create a method that returns employee id and accepts in the employee name.
    // this is for inputting 
    managerSwitcher(employee) {
        const queryString = `SELECT id FROM employee WHERE first_name = ?`

        return this.connection.query(queryString, [employee]);

    };

    // this method takes in a department name and returns it's id
    deptSwitcher(name) {
        const queryString = `SELECT id FROM department WHERE name = ?`

        return this.connection.query(queryString, [name]);

    };


    // returns table with all employess and all associated columns
    viewAllEmployee() {

        const queryString = `SELECT employee.id, first_name, last_name, department.name, role.title, salary 
        FROM employee 
        INNER JOIN role on employee.role_id = role.id 
        INNER JOIN department on role.department_id = department.id;`
        return this.connection.query(queryString);
    };

    // allows the user to view all departments
    viewAllDepartments() {
        const queryString = `SELECT * FROM department;`
        return this.connection.query(queryString);
    };

    // allows the user to view all roles
    viewAllRoles() {
        const queryString = ` SELECT * FROM role;`
        return this.connection.query(queryString);
    };

    // allows the user to add an employee
    addEmployee(first_name, last_name, role_id, manager_id) {
        const queryString = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE (?, ?, ?, ?);`

        return this.connection.query(queryString, [first_name, last_name, role_id, manager_id]);
    };

    // allows the user to add a department
    addDepartment(name) {
        const queryString = `INSERT INTO department (name) VALUE (?);`

        return this.connection.query(queryString, [name]);
    };

        // allows the user to add a department
    addRole(title, salary, departmentId) {
        const queryString = `INSERT INTO role (title, salary, department_id) VALUE (?, ?, ?);`

        return this.connection.query(queryString, [title, salary, departmentId]);
    };




};

module.exports = new ORM(connection)



// ---------------------------------------------------------

// test
const test = new ORM(connection);

// test.deptSwitcher("Crew")
// .then(res => {
    // res[0].id -- what we need to return from role switcher function
//     console.log(res[0].id)})
// .then(connection.end())
// .catch(err => err)

// test.addRole("Pirate", 20000, 3)
// .then(results => console.log(results))
// .then(connection.end())
// .catch(err => err)

// test.roleSwitcher("CEO")
// .then(res => {
//     // res[0].id -- what we need to return from role switcher function
//     console.log(res[0].id)})
// .then(connection.end())
// .catch(err => err)

// test.addEmployee("Jim", "Bob", 2, 2)
// .then(results => console.log(results))
// .then(connection.end())
// .catch(err => err)

// test.viewAllEmployee()
// .then(results => console.table(results))
// .catch(err => err)
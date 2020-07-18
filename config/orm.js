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

    // returns table with all employess and all associated columns
    viewAllEmployee() {

        const queryString = `SELECT employee.id, first_name, last_name, department.name, role.title, salary, is_manager
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

    viewEmployeeINQ() {
        const queryString = 'SELECT id as value, CONCAT(first_name, " ",last_name) as name FROM employee'
        return this.connection.query(queryString);
    };

    viewDepartmentINQ() {
        const queryString = "SELECT id as value, name FROM department"
        return this.connection.query(queryString);
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

    viewRolesINQ() {
        const queryString = "SELECT id as value, title as name FROM role;"
        return this.connection.query(queryString);
    };

    updateEmployee(first_name, last_name, role_id, is_manager, manager_id, id) {
        const queryString = "UPDATE employee SET first_name = ?, last_name = ?, role_id = ?, is_manager = ?, manager_id = ? WHERE id = ?;"
        return this.connection.query(queryString, [first_name, last_name, role_id, is_manager, manager_id, id]);
    };

    viewManagersINQ() {
        const queryString = 'SELECT id as value, CONCAT(first_name, " ",last_name) as name FROM employee WHERE is_manager = 1;'
        return this.connection.query(queryString);
    }

    // employeeFirstName() {
    //     const queryString = "SELECT first_name FROM employee WHERE"
    // }
    
};

module.exports = new ORM(connection)



// ---------------------------------------------------------

// test
const test = new ORM(connection);

// test.viewManagersINQ()
// .then(res => console.table(res))
// .catch(err=> console.error(err))

// test.updateEmployee("Anna", "Spitz", 3, 1, null, 13)
// .then(res => {
//     console.log(res)
// })
// .then(connection.end())
// .catch(err => console.error(err))

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
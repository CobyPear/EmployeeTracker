// import MySQL connection
const connection = require("../config/connection");

// ORM class to neatly hold all of our SQL query functions
class ORM {
    constructor(connection) {
        this.connection = connection;
    }

    // Helper function for SQL syntax.
  // Let's say we want to pass 3 values into the mySQL query.
  // In order to write the query, we need 3 question marks.
  // This helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
  // ["?", "?", "?"].join(', ') => "?, ?, ?";
  printQuestionMarks(numberOfValues){
    const questionMarks = [];

    for (var i = 0; i < numberOfValues; i++) {
      questionMarks.push("?");
    }

    return questionMarks.join(', ');
  }


  // returns table with all employess and all associated columns
  viewAllEmployee() {
      const queryString = `SELECT * FROM employee;`
      return this.connection.query(queryString);
  }

//   viewAllEmployeeByDepartment() {
//       const queryString = `SELECT`
//   }

  // allows the use to add an employee
  addEmployee(firstName, lastName, role_id, manager_id) {
      const queryString = `INSERT INTO employee (firstName, lastName, role_id, manager_id) VALUE (?, ?, ?, ?);`
      
      return this.connection.query(queryString, [firstName, lastName, role_id, manager_id])
  }

}

module.exports = new ORM(connection)
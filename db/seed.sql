-- DROP DATABASE IF EXISTS employee_cms_db;

-- CREATE DATABASE employee_cms_db;

-- USE employee_cms_db;

-- CREATE TABLE department(
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     name VARCHAR(30)
-- );

-- CREATE TABLE role(
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     title VARCHAR(30),
--     salary DECIMAL,
--     department_id INT,
--     FOREIGN KEY (department_id) REFERENCES department(id)
-- );

-- CREATE TABLE employee(
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     first_name VARCHAR(30),
--     last_name VARCHAR(30),
--     role_id INT,
--     manager_id INT,
--     FOREIGN KEY (role_id) REFERENCES role(id),
--     FOREIGN KEY (manager_id) REFERENCES employee(id)
-- );

-- INSERT INTO department (name)
-- VALUES
-- ("Upper Management"),
-- ("Crew"),
-- ("Other");

-- INSERT INTO role (title, salary, department_id)
-- VALUES
-- ("CEO", 200000, 1),
-- ("Manager/Accountant", 950000, 1),
-- ("Crew Member", 47000, 2),
-- ("Captain", 60000, 2),
-- ("Delivery Boy", 41000, 2),
-- ("Bending Unit", 15000, 2),
-- ("Janitor", 40000, 2),
-- ("Intern", 10000, 3),
-- ("Doctor", 10000, 3);

-- INSERT INTO employee (first_name, last_name, role_id)
-- VALUE ("Hubert", "Farnsworth", 1);

-- INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- VALUE
-- ("Hermes", "Conrad", 2, 1),
-- ("Turanga", "Leela", 4, 2),
-- ("Philip", "Fry", 5, 2),
-- ("Bender", "Rodriguez", 6, 1),
-- ("Dr. John", "Zoidberg", 9, 1),
-- ("Amy", "Wong", 8, 1);

-- SELECT * FROM department;
-- SELECT * FROM role;
-- SELECT * FROM employee;

SELECT first_name, last_name, department.name, role.title, salary 
FROM employee 
INNER JOIN role on employee.role_id = role.id
INNER JOIN department on role.department_id = department.id

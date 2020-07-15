INSERT INTO department (name)
VALUES
("Upper Management"),
("Crew"),
("Other");

INSERT INTO role (title, salary, department_id)
VALUES
("CEO", 200000, 1),
("Manager/Accountant", 950000, 1),
("Crew Member", 47000, 2),
("Captain", 60000, 2),
("Delivery Boy", 41000, 2),
("Bending Unit", 15000, 2),
("Janitor", 40000, 2),
("Intern", 10000, 3),
("Doctor", 10000, 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUE ("Hubert", "Farnsworth", 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE
("Hermes", "Conrad", 2, 1),
("Turanga", "Leela", 4, 2),
("Philip", "Fry", 5, 2),
("Bender", "Rodriguez", 6, 1),
("Dr. John", "Zoidberg", 9, 1),
("Amy", "Wong", 8, 1);
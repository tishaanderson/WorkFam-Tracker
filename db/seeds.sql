INSERT INTO department (id, name)
VALUES  (001, "Human Resources"), 
        (002, "IT"),
        (003, "Accounting and Finance"), 
        (004, "Production");

INSERT INTO role (id, title, salary, department_id)
VALUES  (11, "HR Manager", 80000, 001), 
        (22, "IT lead", 65000, 002),
        (33, "Accountant", 120000, 003), 
        (44, "Production lead", 50000, 004);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (1234, "Jackie", "Chan", ), 
        (4567, "IT"),
        (7890, "Accounting and Finance"), 
        (0246, "Production");      
INSERT INTO department (name)
VALUES  ("Field Agents"), 
        ("Administration"),
        ("Support");

INSERT INTO role (title, salary, department_id)
VALUES  ("Secret Agent", 100000, 1), 
        ("Director", 150000, 2),
        ("Comptroller", 90000, 2), 
        ("HR Director", 85000, 2),
        ("Technical Specialist", 95000, 3), 
        ("Secretary", 60000, 2),
        ("Head of Research", 110000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Malory", "Archer", 2, 1),
        ("Sterling", "Archer", 1, 1),
        ("Lana", "Kane", 1, 1), 
        ("Cyril", "Figgis", 4, 2), 
        ("Pam", "Poovey", 6, 2), 
        ("Cheryl", "Tunt", 6, 5),
        ("Ray", "Gillette", 1, 1),
        ("Algernop", "Krieger", 7, 1);
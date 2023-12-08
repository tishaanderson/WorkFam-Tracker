INSERT INTO department (id, name)
VALUES  (1, "Field Agents"), 
        (2, "Administration"),
        (3, "Support");

INSERT INTO role (id, title, salary, department_id)
VALUES  (1, "Secret Agent", 100000, 1), 
        (2, "Director", 150000, 2),
        (3, "Comptroller", 90000, 2), 
        (4, "HR Director", 85000, 2);
        (5, "Technical Specialist", 95000, 3), 
        (6, "Secretary", 60000, 2),
        (7, "Head of Research", 110000, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (1, "Sterling", "Archer", 1, NULL), 
        (2, "Malory", "Archer", 2, NULL),
        (3, "Lana", "Kane", 1, 2), 
        (4, "Cyril", "Figgis", 4, 2), 
        (5, "Cheryl", "Tunt", 6, 2),
        (6, "Pam", "Poovey", 6, 2), 
        (7, "Ray", "Gillette", 1, 2),
        (8, "Algernop", "Krieger", 7, NULL);
SELECT 
employee.id AS employee_id,
CONCAT(employee.first_name, ' ', employee.last_name) AS employee_name,
role.title AS role_title,
role.salary AS role_salary,
department.name AS department_name,
CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name

FROM employee 

JOIN role ON employee.role_id = role.id

JOIN department ON role.department_id = department.id

LEFT JOIN employee AS manager ON employee.manager_id = manager.id;
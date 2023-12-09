//pulling required packages
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();

//connecting my database security info
const db = mysql.createConnection({
  host: "localhost",
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

//function that asks the user if they wish to continue after they've made selections within the app 
function promptToContinue() {
  inquirer
    .prompt({
      type: 'confirm',
      name: 'continue',
      message: 'Do you want to continue?',
      default: true,
    })
    .then((answer) => {
      if(answer.continue) {
        init();
      } else {
        console.log('Exiting application');
        db.end();
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

//function pulls all department information from the department table in the database
function viewDepartments () {
  db.query(
    'SELECT id AS department_id, name AS department_name FROM department', function (err, results) {
   if (err) {
     console.error('Error displaying departments. Please try again.', err);
     return;
   }
     console.log('All Departments:');
     console.table(results);
     promptToContinue();
   });
 }

 //function pulls all role information from the role table in the database
 function viewRoles () {
  db.query(
    'SELECT * FROM role', function (err, results) {
   if (err) {
     console.error('Error displaying all roles. Please try again.', err);
     return;
   }
     console.log('All Roles:');
     console.table(results);
     promptToContinue();
   });
 }

 //function pulls all employee information from the employee table in the database
function viewEmployees () {
 db.query(
  `SELECT 
    employee.id AS employee_id, 
    CONCAT(employee.first_name, ' ', employee.last_name) AS employee_name, 
    role.title AS role_title, 
    role.salary AS role_salary, 
    department.name AS department_name, 
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name 
  FROM employee 
  JOIN role ON employee.role_id = role.id 
  JOIN department ON role.department_id = department.id 
  LEFT JOIN employee AS manager ON employee.manager_id = manager.id;`, function (err, results) {
  if (err) {
    console.error('Error displaying all employees. Please try again.', err);
    return;
  }
    console.log('All Employees:');
    console.table(results);
    promptToContinue();
  });
}

 //function prompts user with questions regarding the NEW DEPARTMENT they wish to add to the DEPARTMENT TABLE within the EMPLOYEES_DB
function addNewDepartment () {
  inquirer
    .prompt([ //questions that populate for user to answer regarding the NEW DEPARTMENT they CREATE
      {
        type: 'input',
        name: 'new_department_title',
        messaged: 'Enter the new department title:',
      },
    ])
    .then((answers) => {
      const { new_department_title } = answers;

      db.query( //adds NEW DEPARTMENT TITLE to DEPARTMENT TABLE
        `INSERT INTO department (name) VALUES (?)`, [new_department_title], (err, results) => {
          if (err) {
           console.error('Error adding new department:', err);
          return; 
          }   

        console.log(`New department, '${new_department_title}', added successfully! Here's your updated DEPARTMENT TABLE:`);
        
        viewDepartments(); //displays the UPDATED DEPARTMENT TABLE with the NEW DEPARTMENT TITLE that the user added
        }
      );
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

 //function prompts user with questions regarding the NEW ROLE they wish to add to the ROLE TABLE within the EMPLOYEES_DB
function addNewRole () {  
  db.query(//pulls the DEPARTMENT TABLE info in preparation of asking the user to choose which department they are wanting their NEWLY CREATED ROLE to be a part of
    'SELECT id, name FROM department', function (err, departments) {
    if (err) {
      console.error('Error loading departments. Please try again.', err);
      return;
    }
    
    inquirer
      .prompt([ //questions that populate for user to answer regarding the NEW ROLE they CREATE
        {
          type: 'input',
          name: 'new_role_title',
          message: 'Enter the title for the new role:',
        },
        {
          type: 'input',
          name: 'new_role_salary',
          message: 'Enter the salary for the new role:',
        },
        {
          type: 'list',
          name: 'new_role_department',
          message: 'Select the department for the new role:',
          choices: departments.map(department => ({ //populates the DEPARTMENT options automatically for the user to select from regarding the NEW ROLE
            name: department.name,
            value: department.id,
          })),
        },
      ])
      .then(answers => {
      const { new_role_title, new_role_salary, new_role_department } = answers;

      db.query( //adds NEW ROLE TITLE to ROLE TABLE in EMPLOYEES_DB
        'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [new_role_title, new_role_salary, new_role_department], function (err, results) {
          if (err) {
            console.error('Error adding new role:', err);
            return;
          }
          console.log(`New role, '${new_role_title}', added successfully! Here's your updated ROLE TABLE:`);

          viewRoles(); //displays the UPDATED ROLE TABLE with the NEW ROLE INFO that the user added
        }
      );
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });
 }

function addNewEmployee () {
  db.query(
    'SELECT * FROM role', function(err, roles) {
      if(err) {
        console.error('Error loading roles. Please try again.', err);
        return;
      }

      db.query(
        'SELECT id, CONCAT(first_name, " ", last_name) AS manager FROM employee', function (err, managers) {
          if(err) {
            console.error('Error loading managers:', err);
            return;
          }

          inquirer
        .prompt([
          {
            type: 'input',
            name: 'new_employee_first',
            message: 'Enter the FIRST NAME of the new employee:',
          },
          {
            type: 'input',
            name: 'new_employee_last',
            message: 'Enter the LAST NAME of the new employee:',
          },
          {
            type: 'list',
            name: 'new_employee_role',
            message: 'Select the ROLE of the new employee:',
            choices: roles.map(role => ({
              name: role.title,
              value: role.id
            })),
          },
          {
            type: 'list',
            name: 'new_employee_manager',
            message: 'Select the MANAGER of the new employee:',
            choices: managers.map(manager => ({
              name: manager.manager || 'No manager',
              value: manager.id,
            })),
          },
          ])
          .then(answers => {
            const { new_employee_first, new_employee_last, new_employee_role, new_employee_manager } = answers;

            db.query(
              'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [new_employee_first, new_employee_last, new_employee_role, new_employee_manager], function (err, results) {
                if(err) {
                  console.error('Error adding new employee:', err);
                  return;
                }
                console.log(`New employee, '${new_employee_first} ${new_employee_last}', added successfully! Here is your updated EMPLOYEE TABLE:`);

                viewEmployees();
              }
            );
          })
          .catch(error => {
            console.error('Error:', error);
          });
        });      
    });
}

function updateEmployee () {
  db.query('SELECT * FROM employee', function (err, results) {
   if (err) {
     console.error('Error displaying all employees. Please try again.', err);
     return;
   }
     console.log('All Employees:');
     console.table(results);
     promptToContinue();
   });
 }

//initial function for user to choose their task
function init() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'task',
      message: 'What would you like to do?',
      choices: [
        // {
        //   name: "View all departments",
        //   value: "",
          
        // },
        // {
        //   name: "View all roles",
        //   value: "VIEW_DEPARTMENTS",
        // },
        // {
        //   name: "View all departments",
        //   value: "VIEW_DEPARTMENTS",
        // },
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a new department',
        'Add a new role',
        'Add a new employee',
        'Update an employee role',
        'Exit'
      ]
    }
  ]) //Switch statement to call the next function based on user input
  .then(answer => {
    switch (answer.task) {
      case 'View all departments':
        viewDepartments();
        break;
      case 'View all roles':
        viewRoles();
        break;
      case 'View all employees':
        viewEmployees();
        break;
      case 'Add a new department':
        addNewDepartment();
        break;
      case 'Add a new role':
        addNewRole();
        break;
      case 'Add a new employee':
        addNewEmployee();
        break;
      case 'Update an employee role':
        updateEmployeeRole();
        break;
      default:
        console.log('Please select a valid task.')
        init();
        break;   
    }
  });


}

init();
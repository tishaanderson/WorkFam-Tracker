const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: "localhost",
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

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

function viewDepartments () {
  db.query('SELECT id AS department_id, name AS department_name FROM department', function (err, results) {
   if (err) {
     console.error('Error displaying departments. Please try again.', err);
     return;
   }
     console.log('All Departments:');
     console.table(results);
     promptToContinue();
   });
 }

 function viewRoles () {
  db.query('SELECT * FROM role', function (err, results) {
   if (err) {
     console.error('Error displaying all roles. Please try again.', err);
     return;
   }
     console.log('All Roles:');
     console.table(results);
     promptToContinue();
   });
 }

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
function addNewRole () {
  inquirer
    .prompt([
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
        type: 'input',
        name: 'new_role_department',
        message: 'Select the department for the new role:',
        choics: departments.map(department => ({
          name: department.name,
          value: department.id,
        })),
      },
    ])
    .then(answers => {
      const { new_role_title, new_role_salary, new_role_department } = answers;
      db.query(
        `INSERT INTO role (new_role_title, new_role_salary, new_role_department)
        VALUES (${new_role_title}, ${new_role_salary}, ${new_role_department});`, function (err, results) {
          console.log(new_role_title + "has been added to the role table");
          if (err) throw err;
          console.log('')
        })
    })


  // db.query(`INSERT INTO ${} FROM employee`, function (err, results) {
  //  if (err) {
  //    console.error('Error displaying all employees. Please try again.', err);
  //    return;
  //  }
  //    console.log('All Employees:');
  //    console.table(results);
  //    promptToContinue();
  //  });
 }

function addNewEmployee () {
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
        'Add a department',
        'Add a role',
        'Add an employee',
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
      case 'Add a role':
        addNewRole();
      case 'Add an employee':
        addNewEmployee();
        break;
      case 'Update an employee role':
        updateEmployee();
        break;
      default:
        console.log('Please select a valid task.')
        init();
        break;   
    }
  });


}

init();
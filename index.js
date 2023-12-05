const inquirer = require('inquirer');
//TODO: add a require const pulling in the functions i create for the switch statement

//initial function for user to choose their task
function init() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'task',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
      ]
    }
  ]) //Switch statement to call the next function based on user input
  .then(answer => {
    switch (answer.task) {
      case 'View all departments':
        viewDepartments(); //TODO create a function to view all departments
        break;
      case 'View all roles':
        viewRoles(); //TODO create a function to view all roles
        break;
      case 'View all employees':
        viewEmployees(); //TODO create a function to view all employees
        break;
      case 'Add a role':
        addNewRole(); //TODO create a function to add a role
        break;
      case 'Add an employee':
        addNewEmployee(); //TODO create a function to add an employee
        break;
      case 'Update an employee role':
        updateEmployee(); //TODO create a function to  update an employee
        break;
      default:
        console.log('Please select a valid task.')
        init();
        break;   
    }
  });
}

init();
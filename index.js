const inquirer = require('inquirer');

//initial function to gather user input
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
    switch
  })
}
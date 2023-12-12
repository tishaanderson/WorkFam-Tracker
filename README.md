# WorkFam-Tracker (Challenge 12)

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Test Sample](#test-sample)
- [Credits](#credits)
- [License](#license)

## Description

Developers frequently have to create interfaces that allow non-developers to easily view and interact with information stored in databases. These interfaces are called content management systems (CMS). The goal of this project is to build a command-line application from scratch to manage a company's employee database, using Node.js, Inquirer, and MySQL.

User Story:
``````
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
``````

## Installation

You'll need to use the [MySQL2 package](https://www.npmjs.com/package/mysql2) to connect to your MySQL database and perform queries, and the [Inquirer package](https://www.npmjs.com/package/inquirer/v/8.2.4). to interact with the user via the command line.

In order to install `inquirer`, please use 

``````
npm i inquirer@8.2.4.
``````

In order to secure your password, you may want to create a `.env` file to store your `mysql` password before pushing to GitHub. Be sure to include the `.env` file on the `.gitignore` file so that only you have access to it.

You might also want to make your queries asynchronous. MySQL2 exposes a .promise() function on Connections to upgrade an existing non-Promise connection to use Promises. To learn more and make your queries asynchronous, refer to the [npm documentation on MySQL2](https://www.npmjs.com/package/mysql2).

Design the database schema as shown in the following image:

## Usage

Once all packages are downloaded, start the app by entering the following in the command terminal: 

``````
npm start
``````
You will then be presented with the following options:

``````
- View All Departments
- View All Roles
- View All Employees
- Add a Department
- Add a Role
- Add an Employee
- Update a Employee Role
``````
You can use the `up` and `down` arrow keys on your keboard to scroll through the task choices and then click the `enter` button to make your selection.

When the `View All Departments` choice is selected, a formatted table showing all department names and department IDs will be displayed.

When the `View All Roles` choice is selected, a formatted table showing all job titles, along with, the role ID, the department that role belongs to, and the salary for that role will be displayed.

When the `View All Employees` choice is selected, a formatted table showing employee data, including employee IDs, first names, last names, job titles, departments, salaries, and managers that the employees report to will be displayed.

When the `Add a Department` choice is selected, the user will be prompted to enter the name of the new department and that department will automatically be added to the database.

When the `Add a Role` choice is selected, the user will be prompted to enter the name, salary and department for the new role and that role will automatically be added to the database.

When the `Add an Employee` choice is selected, the user will be prompted to enter the employee's first name, last name, role, and manager and that employee will automatically be added to the database.

Lastly, when the `Update an Employee Role` choice is selected, the user will be prompted to select an employee to update and, then, select their new role. This information will automatically be updated in the database.

Each time the user makes a change to the database, the new  table will be displayed automatically for them with the updated changes.

Once the user is finished with their task, they may select `Exit` to end the application.

### Test Sample



### Credits

[MySQL2](https://www.npmjs.com/package/mysql2)

[Inquirer](https://www.npmjs.com/package/inquirer/v/8.2.4)

[SMU Bootcamp Activities Module 12](https://techbootcamps.smu.edu/coding/landing-ftpt-b5a/?s=Google-Brand_Tier-1_&dki=Learn%20Coding%20and%20More%20Online&pkw=smu%20coding%20bootcamp&pcrid=454243062435&pmt=e&utm_source=google&utm_medium=cpc&utm_campaign=GGL%7CSMU%7CSEM%7CCODING%7C-%7COFL%7CTIER-1%7CALL%7CBRD%7CEXACT%7CCore%7CBootcamp&utm_term=smu%20coding%20bootcamp&s=google&k=smu%20coding%20bootcamp&utm_adgroupid=104873073054&utm_locationphysicalms=9026987&utm_matchtype=e&utm_network=g&utm_device=c&utm_content=454243062435&utm_placement=&gad_source=1&gclid=CjwKCAiAmZGrBhAnEiwAo9qHiRoAl-bNZ7GAouKuJ0JlnPSvLdiSbMlkquyCHKF7YMPzkpyL2pH2wBoCyb0QAvD_BwE&gclsrc=aw.ds)

### License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
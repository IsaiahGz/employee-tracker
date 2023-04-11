const inquirer = require('inquirer');

// Start options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
const starterOptions = {
	viewDepartment: 'View all departments',
	viewRoles: 'View all roles',
	viewEmployees: 'View all employees',
	addDepartment: 'Add a department',
	addRole: 'Add a role',
	addEmployee: 'Add an employee',
	updateEmployee: 'Update an employee role',
	quit: 'Quit',
};
const starterQuestions = [
	{
		message: 'What would you like to do?',
		name: 'choice',
		type: 'list',
		choices: Object.values(starterOptions),
	},
];

const startPrompt = async () => {
	return inquirer.prompt(starterQuestions);
};

module.exports = { startPrompt, starterOptions };

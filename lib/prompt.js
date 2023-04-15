const inquirer = require('inquirer');
const { displayDepartments } = require('./db');

// Start options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
const starterOptions = {
	viewDepartments: 'View all departments',
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

const startPrompt = () => {
	return inquirer.prompt(starterQuestions);
};

const addDeptPrompt = () => {
	return inquirer.prompt([{ message: 'What is the name of the department you want to add?', name: 'department', type: 'input' }]);
};

const addRolePrompt = async () => {
	const departmentData = await displayDepartments(false);
	const departmentChoices = departmentData.map((dept) => {
		return { name: dept.name, value: dept.id };
	});
	return inquirer.prompt([
		{
			message: 'What is the name of the role?',
			name: 'name',
			type: 'input',
		},
		{
			message: 'What is the salary for the role?',
			name: 'salary',
			type: 'input',
		},
		{
			message: 'Which department does the role belong to?',
			name: 'departmentId',
			type: 'list',
			choices: departmentChoices,
		},
	]);
};

module.exports = { startPrompt, starterOptions, addDeptPrompt, addRolePrompt };

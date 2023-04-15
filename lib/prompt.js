const inquirer = require('inquirer');
const { displayDepartments, getRoleTitles, getEmployees } = require('./db');

// Start options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
const starterOptions = {
	viewDepartments: 'View all departments',
	viewRoles: 'View all roles',
	viewEmployees: 'View all employees',
	addDepartment: 'Add a department',
	addRole: 'Add a role',
	addEmployee: 'Add an employee',
	updateEmployeeRole: 'Update an employee role',
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

const addEmployeePrompt = async () => {
	const rolesData = await getRoleTitles();
	const employeesData = await getEmployees();
	const roleChoices = rolesData.map((role) => {
		return { name: role.title, value: role.id };
	});
	const employeeChoices = employeesData.map((employee) => {
		return { name: `${employee.first_name} ${employee.last_name}`, value: employee.id };
	});
	// Add 'None' as an option when choosing who the manager is
	employeeChoices.unshift({ name: 'None', value: null });
	return inquirer.prompt([
		{
			message: `What is the employee's first name?`,
			name: 'firstName',
			type: 'input',
		},
		{
			message: `What is the employee's last name?`,
			name: 'lastName',
			type: 'input',
		},
		{
			message: `What is the employee's role?`,
			name: 'roleId',
			type: 'list',
			choices: roleChoices,
		},
		{
			message: `Who is the employee's manager?`,
			name: 'managerId',
			type: 'list',
			choices: employeeChoices,
		},
	]);
};

const updateEmployeeRolePrompt = async () => {
	const rolesData = await getRoleTitles();
	const employeesData = await getEmployees();
	const roleChoices = rolesData.map((role) => {
		return { name: role.title, value: role.id };
	});
	const employeeChoices = employeesData.map((employee) => {
		return { name: `${employee.first_name} ${employee.last_name}`, value: employee.id };
	});
	return inquirer.prompt([
		{
			message: `Which employee's role do you want to update?`,
			name: 'employeeId',
			type: 'list',
			choices: employeeChoices,
		},
		{
			message: `Which role do you want to assign the selected employee?`,
			name: 'roleId',
			type: 'list',
			choices: roleChoices,
		},
	]);
};

module.exports = { startPrompt, starterOptions, addDeptPrompt, addRolePrompt, addEmployeePrompt, updateEmployeeRolePrompt };

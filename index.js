require('dotenv').config();
const {
	starterOptions,
	startPrompt,
	addDeptPrompt,
	addRolePrompt,
	addEmployeePrompt,
	updateEmployeeRolePrompt,
	updateEmployeeManagerPrompt,
} = require('./lib/prompt');
const {
	closeDb,
	displayDepartments,
	displayRoles,
	displayEmployees,
	addDepartment,
	addRole,
	addEmployee,
	updateEmployeeRole,
	updateEmployeeManager,
} = require('./lib/db');

const init = async () => {
	let shouldContinue = true;

	while (shouldContinue) {
		const { choice } = await startPrompt();
		switch (choice) {
			case starterOptions.viewDepartments:
				// View all departments
				await displayDepartments();
				break;
			case starterOptions.viewRoles:
				await displayRoles();
				break;
			case starterOptions.viewEmployees:
				await displayEmployees();
				break;
			case starterOptions.addDepartment:
				const { department } = await addDeptPrompt();
				await addDepartment(department);
				break;
			case starterOptions.addRole:
				const roleInfo = await addRolePrompt();
				await addRole(roleInfo);
				break;
			case starterOptions.addEmployee:
				const employeeInfo = await addEmployeePrompt();
				await addEmployee(employeeInfo);
				break;
			case starterOptions.updateEmployeeRole:
				const employeeRoleInfo = await updateEmployeeRolePrompt();
				await updateEmployeeRole(employeeRoleInfo);
				break;
			case starterOptions.updateEmployeeManager:
				const { employeeId, managerId } = await updateEmployeeManagerPrompt();
				if (employeeId === managerId) console.log(`Employee can't be their own manager`);
				else {
					await updateEmployeeManager({ employeeId, managerId });
				}
				break;
			case starterOptions.quit:
				shouldContinue = false;
				break;
		}
	}
	// Close the connection on the database
	closeDb();
	console.log('Goodbye!');
};

init();

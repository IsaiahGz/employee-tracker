require('dotenv').config();
const { starterOptions, startPrompt, addDeptPrompt } = require('./lib/prompt');
const { closeDb, displayDepartments, displayRoles, displayEmployees, addDepartment } = require('./lib/db');

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

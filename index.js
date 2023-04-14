require('dotenv').config();
const { starterOptions, startPrompt } = require('./lib/prompt');
const { closeDb, displayDepartments } = require('./lib/db');

const init = async () => {
	let shouldContinue = true;

	while (shouldContinue) {
		const { choice } = await startPrompt();
		switch (choice) {
			case starterOptions.viewDepartments:
				// View all departments
				await displayDepartments();
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

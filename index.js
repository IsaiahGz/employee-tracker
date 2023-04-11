const { startPrompt, starterOptions } = require('./lib/prompt');

const init = async () => {
	let shouldContinue = true;
	const { choice } = await startPrompt();
	switch (choice) {
		case starterOptions.viewDepartment:
			// View all departments
			break;
		case starterOptions.quit:
			shouldContinue = false;
			console.log('Goodbye!');
			break;
	}
	if (shouldContinue) init();
};

init();

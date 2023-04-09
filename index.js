const { startPrompt } = require('./lib/prompt');

const init = () => {
	startPrompt((answer) => {
		console.log(answer);
	});
};

init();

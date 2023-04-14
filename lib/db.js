const mysql = require('mysql2');
const cTable = require('console.table');

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: process.env.DB_PASSWORD,
	database: 'employee_db',
});

const closeDb = () => {
	db.end();
};

const displayDepartments = () => {
	return new Promise((resolve, reject) => {
		// Display all department data to console
		db.query('SELECT * FROM department', (err, results) => {
			if (err) {
				console.log(err);
				reject(err);
			} else {
				console.table(results);
				resolve();
			}
		});
	});
};

const displayRoles = () => {
	return new Promise((resolve, reject) => {
		// Display all department data to console
		db.query(
			'SELECT role.id, title, name as department, salary FROM role JOIN department ON role.department_id = department.id ORDER BY role.id;',
			(err, results) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					console.table(results);
					resolve();
				}
			}
		);
	});
};

module.exports = { closeDb, displayDepartments, displayRoles };

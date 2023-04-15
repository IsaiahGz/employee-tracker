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

const displayDepartments = (logTable = true) => {
	return new Promise((resolve, reject) => {
		// Display all department data to console
		db.query('SELECT * FROM department', (err, results) => {
			if (err) {
				console.log(err);
				reject(err);
			} else {
				if (logTable) console.table(results);
				resolve(results);
			}
		});
	});
};

const displayRoles = () => {
	return new Promise((resolve, reject) => {
		// Display all role data to console
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

const displayEmployees = () => {
	return new Promise((resolve, reject) => {
		// Display all employee data to console
		db.query(
			`SELECT e1.id, e1.first_name, e1.last_name, role.title, department.name, role.salary, CONCAT(e2.first_name, " ", e2.last_name) as manager
			FROM employee e1 
			JOIN role ON e1.role_id = role.id 
			JOIN department ON role.department_id = department.id 
			LEFT JOIN employee e2 ON e1.manager_id = e2.id
			ORDER BY e1.id;`,
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

const addDepartment = (departmentName) => {
	return new Promise((resolve, reject) => {
		// Add department to database
		db.query(`INSERT INTO department(name) VALUE (?)`, departmentName, (err, results) => {
			if (err) {
				console.log(err);
				reject(err);
			} else {
				console.log(`Added '${departmentName}' department to the database.`);
				resolve();
			}
		});
	});
};

const addRole = ({ name, salary, departmentId }) => {
	return new Promise((resolve, reject) => {
		// Add role to database
		db.query(`INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?)`, [name, salary, departmentId], (err, results) => {
			if (err) {
				console.log(err);
				reject(err);
			} else {
				console.log(`Added '${name}' role to the database.`);
				resolve();
			}
		});
	});
};

const getRoleTitles = () => {
	return new Promise((resolve, reject) => {
		// Get roles
		db.query(`SELECT id, title FROM role`, (err, results) => {
			if (err) {
				console.log(err);
				reject(err);
			} else {
				resolve(results);
			}
		});
	});
};

const getEmployees = () => {
	return new Promise((resolve, reject) => {
		// Get employees
		db.query(`SELECT id, first_name, last_name FROM employee`, (err, results) => {
			if (err) {
				console.log(err);
				reject(err);
			} else {
				resolve(results);
			}
		});
	});
};

const addEmployee = ({ firstName, lastName, roleId, managerId }) => {
	return new Promise((resolve, reject) => {
		// Add employee to database
		db.query(
			`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
			[firstName, lastName, roleId, managerId],
			(err, results) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					console.log(`Added '${firstName} ${lastName}' employee to the database.`);
					resolve();
				}
			}
		);
	});
};

const updateEmployeeRole = ({ employeeId, roleId }) => {
	return new Promise((resolve, reject) => {
		// Update employee in database
		db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [roleId, employeeId], (err, results) => {
			if (err) {
				console.log(err);
				reject(err);
			} else {
				console.log(`Updated employee role in database.`);
				resolve();
			}
		});
	});
};

module.exports = {
	closeDb,
	displayDepartments,
	displayRoles,
	displayEmployees,
	addDepartment,
	addRole,
	getRoleTitles,
	getEmployees,
	addEmployee,
	updateEmployeeRole,
};

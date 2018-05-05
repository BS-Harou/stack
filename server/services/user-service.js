const db = require('../db');

const createUser = (user) => {
	return db.none(`
		INSERT INTO users (id, name, email, access_token)
		VALUES (\${id}, \${name}, \${email}, \${accessToken})
	`, user);
};

const findUserById = (userId) => {
	return db.oneOrNone(`
		SELECT * FROM users
		WHERE id=\${userId}
	`, {userId});
};

module.exports ={
	createUser,
	findUserById,
};

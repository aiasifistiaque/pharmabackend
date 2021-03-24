const mongoose = require('mongoose');

function connect() {
	const connectionString =
		process.env.MONGO_URI;
	mongoose
		.connect(connectionString, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		})
		.then(() => console.log('connection to database successful'))
		.catch(err => console.error(err));
}
connect();

module.exports = connect;

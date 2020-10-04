const express = require('express');
const basic = require('./routes/basic');
const users = require('./routes/users');
const auth = require('./routes/auth');
const me = require('./routes/me');
const drug = require('./routes/drug');
const auto = require('./routes/autos');
const all = require('./routes/all');

const cors = require('cors');

const app = express();
app.use(cors());

const connection = require('./connection');
const config = require('config');

if (!config.get('jwtPrivateKey')) {
	console.error('FATAL ERROR: jwtPrivateKey is not defined.');
	process.exit(1);
}

app.use(express.json());
app.use(cors());

//routes
app.use('/', basic);
app.use('/api/register', users);
app.use('/api/login', auth);
app.use('/me', me);
app.use('/api/allmeds', drug);
app.use('/automate/populate', auto);
app.use('/api/all', all);

const port = process.env.PORT || 3000;

app.listen(3000, () => {
	console.log(`listening to port ${port}`);
});

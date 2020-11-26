const keys = require('./keys');

// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres Client Setup
const { Pool } = require('pg');
const pgClient = new Pool({
	user: keys.pgUser,
	host: keys.pgHost,
	database: keys.pgDatabase,
	password: keys.pgPassword,
	port: keys.pgPort,
});

pgClient.on('connect', () => {
	pgClient
		.query('CREATE TABLE IF NOT EXISTS values (value VARCHAR(40))')
		.catch((err) => console.log(err));
});

// Express route handlers

app.get('/', (req, res) => {
	res.send('Server is running....');
});

app.get('/values/all', async (req, res) => {
	const values = await pgClient.query('SELECT * from values');

	res.send(values.rows);
});

app.post('/values', async (req, res) => {
	const value = req.body.value;

	pgClient.query('INSERT INTO values(value) VALUES($1)', [value]);

	res.send({ working: true });
});

app.listen(5000, (err) => {
	console.log('Listening');
});

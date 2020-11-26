import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InsertValues = () => {
	const [currentValue, setCurrentValue] = useState('');
	const [values, setValues] = useState([]);

	const fetchValues = async () => {
		const values = await axios.get('/api/values/all');

		setValues(values.data);
	};

	useEffect(() => {
		fetchValues();
	}, []);

	const handleSubmit = async (event) => {
		event.preventDefault();

		await axios.post('/api/values', {
			value: currentValue,
		});

		setCurrentValue('');
		// fetchValues();
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<label>Enter your value:</label>
				<input
					value={currentValue}
					onChange={(event) => setCurrentValue(event.target.value)}
				/>
				<button>Submit</button>

				<h3>Values in db</h3>
				{values && values.map((index) => index.value).join(', ')}
			</form>
		</>
	);
};

export default InsertValues;

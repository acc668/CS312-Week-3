const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

const { MAILCHIMP_API_KEY, MAILCHIMP_SERVER_PREFIX, MAILCHIMP_AUDIENCE_ID } = process.env;

app.post('/subscribe', async (req, res) =>
{
	const { email } = req.body;

	const data =
	{
		email_address: email;
		status: 'subscribed'
	};

	const options =
	{
		headers:
		{
			'Authorization': 'apikey ${MAILCHIMP_API_KEY}',
			'Content-Type': 'application/json'
		}
	};

	try
	{
		await axios.post('https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members',
		data,
		options);

	res.status(200).json({ message: 'Subscribed!' });
} catch (error)
  {
    res.status(400).json({ message: error.response.data.detail });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
{
	console.log('Server is running on port ${PORT}');
});

	


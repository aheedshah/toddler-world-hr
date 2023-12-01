const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
const cors = require('cors'); // Import cors

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

AWS.config.update({
    region: 'us-west-2',
    endpoint: 'http://localhost:8000',
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

app.get('/', async (req, res) => {
    try {
        const params = {
            TableName: 'UsersTable',
        };

        const result = await dynamoDB.scan(params).promise();

        res.status(200).json(result.Items);
    } catch (error) {
        console.error('Error during scan:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Retrieve user from DynamoDB based on email
        const params = {
            TableName: 'UsersTable',
            Key: { username },
        };

        const result = await dynamoDB.get(params).promise();

        if (result.Item && result.Item.password === password) {
            // Successful authentication
            res.status(200).json({ message: 'Authentication successful' });
        } else {
            // Failed authentication
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
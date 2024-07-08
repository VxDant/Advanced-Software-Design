const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = 3000;

const uri = "mongodb+srv://admin:admin@advanced-software-desig.apa48bh.mongodb.net/?retryWrites=true&w=majority&appName=Advanced-Software-Design";

// Middleware
app.use(bodyParser.json());

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function main() {
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log('MongoDB connected...');

        // Select the database and collection
        const database = client.db('Advanced-Software-Design'); // Replace with your database name
        const usersCollection = database.collection('users');

        // POST route to add user
        app.post('/api/users', async (req, res) => {
            const { username, mobile, email, firstName, lastName } = req.body;
            try {
                const newUser = {
                    username,
                    mobile,
                    email,
                    firstName,
                    lastName
                };
                const result = await usersCollection.insertOne(newUser);
                res.status(201).json({ 
                    _id: result.insertedId, 
                    ...newUser 
                });
            } catch (err) {
                res.status(400).json({ error: err.message });
            }
        });

        // Start the server
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (err) {
        console.error(err);
    }
}

main().catch(console.error);

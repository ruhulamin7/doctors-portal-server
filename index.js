const express = require('express')
const app = express()
const cors = require('cors')
const { MongoClient } = require('mongodb');
require('dotenv').config()

const port = process.env.PORT || 5000

// middleware
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qu1uq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// console.log(uri)


async function run() {
    try {
        await client.connect();
        // console.log('database connented successully!')
        const database = client.db("doctors_portal");
        const appointmentsCollection = database.collection("appointments");

        // create a document to insert
        app.post('/appointments', async (req, res) => {
            const appointment = req.body;
            console.log(appointment)
            const result = await appointmentsCollection.insertOne(appointment)
            res.json(result)
        })


    } finally {
        // await client.close();
    }
}
run().catch(console.dir);








app.get('/', (req, res) => {
    res.send('Hello Doctors Portal!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
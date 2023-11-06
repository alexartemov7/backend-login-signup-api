import express from "express"
import cors from "cors"
import { MongoClient } from 'mongodb'

import 'dotenv/config'

const app = express()
app.use(cors())
app.use(express.json())

const client = new MongoClient(process.env.MONGO_URI)
const db = client.db('signup-login-aa')
const userLogins = db.collection('users')

client.connect();
console.log('Connected to Mongo')

app.post('/users', signUp)
app.post('/users/login', login)

async function signUp(req, res) {
    const newUser = req.body
    await db.collection('users').insertOne(newUser)
    res.status(201).send({ message: 'User signedUp' })
}

async function login(req, res) {
    const { email, password } = req.body
    const user = await db.collection('users').findOne({ email: "todd@bocacode.com" })
    if (user.email === email && user.password === password) {
        res.status(200).send({ message: 'You are Logged in'})
    } else {
        res.status(400).send({ message: "No user"})
    }
}

app.listen('8080', () => console.log('api listening on port 8080'))
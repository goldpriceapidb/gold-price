import express from "express"

// Initialize Environment Variables
import dotenv from "dotenv"
dotenv.config()

import Database from "./database.js"
new Database()

import { cors } from "./middleware.js"

// Initialize Express
const app = express()
const PORT = process.env.PORT || 3003

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// API Routes
import country from "./api/country.js"

app.use("/api/country", cors, country)

app.get("/", cors, (_, res) => {
	res.status(200).send({ text: "Hello World!"})
})
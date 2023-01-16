import express from "express"
import dotenv from "dotenv"
import Database from "./database.js"
import { cors } from "./middleware.js"
import { getAllStuffDone } from "./api/update.js"
import content from "./data/html.js"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3003

new Database().start().then(() => {
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`)
	})
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// API Routes
import country from "./api/country.js"
import update from "./api/update.js"

app.use("/api/country", cors, country)
app.use("/api/update", cors, update)

app.get("/", cors, (_, res) => {
	res.status(200).send(content)
})

app.get("/ping", cors, (_, res) => {
	res.status(200).send("pong")
})

app.get("*", cors, (_, res) => {
	res.sendStatus(404)
})

setInterval(() => {
	console.log("Updating all countries...")
	getAllStuffDone()
}, 1000 * 60 * 60)

// the above setInterval runs the function every hour
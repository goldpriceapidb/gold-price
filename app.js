import express from "express"
import cors from "./middleware.js"
import fetchAndScrape from "./utilities/fetchAndScrape.js"

import path from 'path'
const __dirname = path.resolve()

let app = express()
let port = process.env.PORT || 3003

let goldRate = {}

app.listen(port, () => {
	console.log(`Alive on port ${port}`)
})

app.get("/", cors, async (_, res) => {
	res.sendFile(__dirname + "/index.html")
})

app.get("/rate", (_, res) => {
	res.status(200).send(goldRate)
})

app.get("/update", cors, async (_, res) => {
	await update()
	res.status(200).send("UPDATED GOLD RATE")
})

async function update() {
	goldRate = await fetchAndScrape()
}

update()

let thirtyMinutes = 1000 * 60 * 30
setInterval(update, thirtyMinutes)
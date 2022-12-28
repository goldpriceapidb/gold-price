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

app.get("/rate", cors, (_, res) => {
	res.status(200).send(goldRate)
})

app.get("/live", cors, async (_,res) => {
	await update()
	res.status(200).send(goldRate)
})

app.get("/update", cors, async (_, res) => {
	await update()
	res.status(200).send("UPDATED GOLD RATE")
})

async function update() {
	goldRate = await fetchAndScrape()
	let options = { timeZone: "Asia/Kolkata", hour12: false }
	let ISTTime = new Date().toLocaleString("en-US", options)
	console.log(`Updated Time (IST): ${ISTTime}`)
}

update()

let thirtyMinutes = 1000 * 60 * 30
setInterval(update, thirtyMinutes)
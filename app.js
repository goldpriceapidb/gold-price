import express from "express"
import cors from "./middleware.js"
import fetchAndScrape from "./utilities/fetchAndScrape.js"
import saveToFile from "./store/save.js"
import { indianGoldPrice } from "./store/save.js"

let app = express()
let port = process.env.PORT || 3003

app.listen(port, () => {
	console.log(`Alive on port ${port}`)
})

app.get("/", cors, async (_, res) => {
	res.status(200).sendFile(indianGoldPrice)
})

app.get("/live", cors, async (_, res) => {
	let data = await fetchAndScrape()
	res.status(200).send(data)
})

app.get("/save", cors, async (_, res) => {
	await saveToFile()
	res.status(200).send("Saved to file")
})

let thirtyMinutes = 1000 * 60 * 30

setInterval(async () => {
	await saveToFile()
}, thirtyMinutes)

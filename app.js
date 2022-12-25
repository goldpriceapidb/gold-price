import express from "express"
import cors from "./middleware.js"
import fetchAndScrape from "./utilities/fetchAndScrape.js"

let app = express()
let port = process.env.PORT || 3003

app.listen(port, () => {
	console.log(`Alive on port ${port}`)
})

app.get("/", cors, async (_, res) => {
	let data = await fetchAndScrape()
	res.status(200).send(data)
})
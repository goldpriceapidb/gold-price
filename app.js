import fetch from "node-fetch"
import * as cheerio from "cheerio"
import express from "express"
import cors from "./middleware.js"

let url =
	"https://economictimes.indiatimes.com/markets/gold-rate-in-india-today"

async function getContent() {
	let response = await fetch(url)
	let data = await response.text()
	return data
}

function scrape(data) {
	let $ = cheerio.load(data)
	let table = $("#goldTrendsTable")
	let rows = table.find("tbody tr")
	let gold = []
	for (let i = 0; i < 2; i++) {
		let row = $(rows[i])
		let cols = row.find("td")
		let obj = {}
		obj.type = $(cols[0]).text()
		obj.price = $(cols[1]).text()
		gold.push(obj)
	}
	let credits = {
		credits:
			"https://economictimes.indiatimes.com/markets/gold-rate-in-india-today",
		developer: "ANGRIS",
	}
	gold.push(credits)
	return gold
}

let app = express()

app.get("/", cors, async (req, res) => {
	let data = await getContent()
	let gold = scrape(data)
	res.status(200).send(gold)
})

let port = process.env.PORT || 3003

app.listen(port, () => {
	console.log(`Alive on port ${port}`)
})

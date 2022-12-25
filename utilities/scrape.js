import * as cheerio from "cheerio"

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
			"https://economictimes.indiatimes.com",
		developer: "ANGRIS",
	}
	gold.push(credits)
	return gold
}

export default scrape
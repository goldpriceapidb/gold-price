
function getGoldPriceAndCurrency(content) {
	let $ = cheerio.load(content)
	let img = $(".cleft.fleft.data-img.pad3")
	let parent = img.parent()
	let table = parent.find(".data-table-2")
	let rows = table.find("tbody tr")
	let row = $(rows[1])
	let cols = row.find("td")

	let noisyCurrencyText = $(cols[1]).text().trim()
	let goldRate = $(cols[2]).text().trim()
	return {
		goldRate: sanitizeGoldRate(goldRate),
		currency: sanitizeTextToCurrency(noisyCurrencyText)
	}
}


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

function sanitizeTextToCurrency(text) {
	let currency = text.split(" ").pop()
	return currency
}

function sanitizeGoldRate(text) {
    return text.split(" ").join("") // remove spaces
}

function getConversionToUSD(content) {
	let $ = cheerio.load(content)
	let img = $(".cleft.fleft.data-img.pad3")
	let parent = img.parent()
	let table = parent.find(".data-table-2.dt2-currency")
	let rows = table.find("tbody tr")
	let row = $(rows[1])
	let cols = row.find("td")
	let conversionRate = $(cols[2]).text().trim()
	return 1 / conversionRate
}

function getLastUpdated(content) {
	let $ = cheerio.load(content)
	let img = $(".cleft.fleft.data-img.pad3")
	let parent = img.parent()
	let font = parent.find("font")
	let i = font.find("i")
	let b = i.find("b")
	let text = b.text().trim()
	return text
}


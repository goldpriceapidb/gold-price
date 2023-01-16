
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

function sanitizeLastUpdated(text) {
	let dateTime = text.split(" ")
	let date = dateTime[0]
	let month = dateTime[1]
	let year = dateTime[2]
	let time = dateTime[3]

	month = month.slice(0, 3)

	let formattedDate = `${date}-${month}-${year}`
	formattedDate = sanitizeDate(formattedDate)

	dateTime = `${formattedDate}T${time}:00.000+00:00`

	return dateTime
}

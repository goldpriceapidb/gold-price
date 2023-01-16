import * as cheerio from "cheerio"
import countries from "../data/countries.js"
import { codeToLiveURL, getPage } from "./fetchData.js"
import { sanitizeDate } from "./sanitize.js"

async function fetchCountry(code) {
	let url = codeToLiveURL(code)
	let countryName = countries.find(
		(country) => country.countryCode === code
	).countryName
	try {
		const content = await getPage(url)

		let { goldRate, currency } = getGoldPriceAndCurrency(content)
		let conversionRate = getConversionToUSD(content)
		let lastUpdated = sanitizeLastUpdated(getLastUpdated(content))

		let gold = {
			countryName,
			countryCode: code,
			currency,
			goldRate,
			lastUpdated,
			conversionRate,
		}
		return formatValues(gold)
	} catch (error) {
		console.log(error)
	}
}

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
    text = text.split(" ").join("") // remove spaces
    text = text.split(",").join("") // remove commas
    return parseFloat(text)
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

    conversionRate = conversionRate.split(" ").join("") // remove spaces
    conversionRate = conversionRate.split(",").join("") // remove commas
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

function formatValues(country) {

    let value = {}
    value.countryName = country.countryName
    value.countryCode = country.countryCode
    value.currency = country.currency
    value.goldRate = {
        rate: country.goldRate,
        currency: country.currency,
        lastUpdated: country.lastUpdated
    },
    value.conversionRate = {
        rate: country.conversionRate,
        currency: "USD"
    }

    return value
}

export default fetchCountry
import fetch from "node-fetch"
import * as cheerio from "cheerio"
import sanitize from "./sanitize.js"
import countries from "../data/countries.js"
import fetchCountry from "./liveprice.js"

const sourceURL = "http://goldpricez.com"
const liveURL = "https://www.livepriceofgold.com"

async function getPage(sourceURL) {
	let response = await fetch(sourceURL)
	let data = await response.text()
	return data
}

async function getIndia() {
	let response = await fetch("http://viewbcastgold.dpgold.in:8811/VOTSBroadcast/Services/xml/GetLiveRate")
	let data = await response.json()
	let value =parseInt(data.split("\u0009")[23])
	return value
}

function codeToURL(code) {
	return `${sourceURL}/${code}/gram`
}

function codeToLiveURL(code) {
	return `${liveURL}/${code}-gold-price.html`
}

function getConversionToUSD(content) {
	let $ = cheerio.load(content)
	let table = $(".display_rates").parent().find(".tb")
	let rows = table.find("tbody tr")

	let row = $(rows[4])
	let cols = row.find("td")

	let conversionRate = $(cols[1]).text().trim()
	return conversionRate
}

function getGoldRate(content) {
	let $ = cheerio.load(content)
	let table = $("#price-list-sizes").find("table")
	let rows = table.find("tbody tr")

	let row = $(rows[1])
	let cols = row.find("td")

	let rate = $(cols[1]).text().trim()
	return rate
}

function lastUpdatedRate(content) {
	let $ = cheerio.load(content)
	let div = $(".col.c9.ccenter")
	let table = div.find("table")
	let rows = table.find("tbody tr")
	let row = $(rows[0])
	let cols = row.find("td")
	let col = $(cols[0])
	let bTags = col.find("b")

	let date = $(bTags[0]).text().trim()
	let time = $(bTags[1]).text().trim()
	let timezone = $(bTags[2]).text().trim()

	row = $(rows[1])
	cols = row.find("td")
	col = $(cols[0])
	bTags = col.find("b")

	let currDate = $(bTags[0]).text().trim()
	let currTime = $(bTags[1]).text().trim()

	return {
		timezone,
		gold: {
			date,
			time,
		},
		currency: {
			date: currDate,
			time: currTime,
		},
	}
}

async function fetchJSON(code) {
	let url = codeToURL(code)
	let countryName = countries.find(
		(country) => country.countryCode === code
	).countryName
	try {
		const content = await getPage(url)
		let conversionRate = getConversionToUSD(content)
		let goldRate = getGoldRate(content)
		let lastUpdated = lastUpdatedRate(content)
		let gold = {
			countryName,
			countryCode: code,
			conversionRate,
			goldRate,
			lastUpdated,
		}
		return gold
	} catch (error) {
		console.log(error)
	}
}

async function getCountryData(code) {
	let country = countries.find((country) => country.countryCode === code)
	if (country.type === "goldpricez") {
		let countryGold = await fetchJSON(code)
		countryGold = sanitize(countryGold)
		return countryGold
	}

	if (country.type === "livepriceofgold") {
		let countryGold = await fetchCountry(code)
		return countryGold
	}
}

export { getCountryData, codeToLiveURL, getPage,getIndia }

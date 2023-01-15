import fetch from "node-fetch"
import * as cheerio from "cheerio"

const sourceURL = "http://goldpricez.com/"

async function getPage(sourceURL) {
    let response = await fetch(sourceURL)
    let data = await response.text()
    return data
}

function codeToURL(code) {
    return `${sourceURL}${code}/gram`
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

function lastUpdated(content) {
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

    return [date, time, timezone]
}
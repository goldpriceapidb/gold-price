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

    let conversionRate = $(cols[1]).text()
    return conversionRate
}

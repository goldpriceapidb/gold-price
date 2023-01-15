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
    try {
        const content = await getPage(url)
        let conversionRate = getConversionToUSD(content)
        let goldRate = getGoldRate(content)
        let lastUpdated = lastUpdatedRate(content)
        let gold = {
            country: code,
            conversionRate,
            goldRate,
            lastUpdated
        }
        return gold
    } catch (error) {
        console.log(error)
    }
}

function getCurrencyAndRate(gold) {
    let goldRate = gold.goldRate // "₹4000.00 INR"
    let currency = goldRate.split(" ")[1] // "INR"
    let rate = goldRate.split(" ")[0] // "₹4000.00"
    if (isNaN(rate[0])) { 
        rate = rate.slice(1) // "4000.00"
    }
    return {
        currency,
        rate
    }
}

function sanitizeConversionRate(gold) {
    let conversionRate = gold.conversionRate // $14.234 USD
    let rate = conversionRate.split(" ")[0] // "$14.234"
    rate = rate.slice(1) // "14.234"
    return rate
}


function sanitizeTime(string) {
    // string would be "07:04:00 pm"

    let time = string.split(" ")[0] // "07:04:00"
    let hours = time.split(":")[0] // "07"
    let minutes = time.split(":")[1] // "04"
    let seconds = time.split(":")[2] // "00"

    if (hours.length === 1) {
        hours = "0" + hours // "07"
    }

    if (minutes.length === 1) {
        minutes = "0" + minutes // "04"
    }

    if (seconds.length === 1) { 
        seconds = "0" + seconds // "00"
    }

    // if it's pm, then add 12 hours
    if (string.split(" ")[1] === "pm") {
        hours = Number(hours) + 12 // 19
    }

    // if it's 24:00:00, then it's midnight, so replace 24 with 00
    if(hours === "24") {
        hours = "00" // "00"
    }

    // if it's 12:00:00 am, then it's midnight, so replace 12 with 00
    if(hours === "12" && string.split(" ")[1] === "am") {
        hours = "00" // "00"
    }

    return hours + ":" + minutes + ":" + seconds // "19:04:00"
}

function get24Time(gold) {
    let lastUpdated = gold.lastUpdated
    let goldTime = lastUpdated.gold.time // 07:04:00 am
    let currencyTime = lastUpdated.currency.time // 07:04:00 am

    let gold24Time = sanitizeTime(goldTime) // 19:04:00
    let currency24Time = sanitizeTime(currencyTime) // 19:04:00

    return {
        gold: gold24Time,
        currency: currency24Time
    }
}

function sanitizeDate(string) {
    let day = string.split("-")[0] // "15"
    let month = string.split("-")[1] // "Jan"
    let year = string.split("-")[2] // "2023"

    if (day.length === 1) {
        day = "0" + day // "15"
    }

    let monthMap = {
        "Jan": "01",
        "Feb": "02",
        "Mar": "03",
        "Apr": "04",
        "May": "05",
        "Jun": "06",
        "Jul": "07",
        "Aug": "08",
        "Sep": "09",
        "Oct": "10",
        "Nov": "11",
        "Dec": "12"
    }
    month = monthMap[month] // "01"

    return year + "-" + month + "-" + day // "2023-01-15"
}

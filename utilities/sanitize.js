import { formatInTimeZone } from 'date-fns-tz/esm'

function sanitize(gold) {
    let value = {}
    value.countryName = gold.countryName
    value.countryCode = gold.countryCode
    
    let currencyAndRate = getCurrencyAndRate(gold)
    value.currency = currencyAndRate.currency

    let formattedDateTime = getFormattedDate(gold)
    
    value.conversionRate = {
        rate: sanitizeConversionRate(gold),
        currency: "USD",
        lastUpdated: formattedDateTime.currency
    }

    value.goldRate = {
        rate: currencyAndRate.rate,
        currency: value.currency,
        lastUpdated: formattedDateTime.gold
    }

    return value
}

function getFormattedDate(gold) {
    let timeZone = sanitizeTimeZone(gold)
    let date = getDate(gold)
    let goldDate = date.gold
    let currencyDate = date.currency
    let time = get24Time(gold)
    let goldTime = time.gold
    let currencyTime = time.currency
    let goldFormattedDate = formatInTimeZone(`${goldDate}T${goldTime}Z`, timeZone, "yyyy-MM-dd HH:mm:ssXXX")
    let currencyFormattedDate = formatInTimeZone(`${currencyDate}T${currencyTime}Z`, timeZone, "yyyy-MM-dd HH:mm:ssXXX")
    return {
        gold: goldFormattedDate,
        currency: currencyFormattedDate
    }
}

function getCurrencyAndRate(gold) {
    let goldRate = gold.goldRate // "₹4000.00 INR"
    let goldRateArray = goldRate.split(" ")
    if(goldRateArray.length !== 2) {
        goldRateArray.shift()
    }

    let currency = goldRateArray[1] // "INR"
    let rate = goldRateArray[0] // "₹4000.00"
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

function getDate(gold) {
    let lastUpdated = gold.lastUpdated
    let goldDate = lastUpdated.gold.date // 15-Jan-2023
    let currencyDate = lastUpdated.currency.date // 15-Jan-2023

    let goldSanitizedDate = sanitizeDate(goldDate) // 2023-01-15
    let currencySanitizedDate = sanitizeDate(currencyDate) // 2023-01-15

    return {
        gold: goldSanitizedDate,
        currency: currencySanitizedDate
    }
}

function sanitizeTimeZone(gold) {
    let string = gold.lastUpdated.timezone.split(" ").join("/")
    if (string.includes("-")) {
        string = string.replaceAll("-", "_")
    }
    return string
}

export default sanitize

export { sanitizeDate }
import fetch from "node-fetch"
import * as cheerio from "cheerio"

const sourceURL = "http://goldpricez.com/"

async function getPage(sourceURL) {
    let response = await fetch(sourceURL)
    let data = await response.text()
    return data
}


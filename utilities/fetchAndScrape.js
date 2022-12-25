import scrape from "./scrape.js"
import getContent from "./getContent.js"
import sourceURL from "./sourceURL.js"

async function fetchAndScrape() {
	let data = await getContent(sourceURL)
	let gold = scrape(data)
	return gold
}

export default fetchAndScrape
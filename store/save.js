// fetch and write to disk as indianGoldPrice.json
import fs from "fs"
import fetchAndScrape from "../utilities/fetchAndScrape.js"
import { fileURLToPath } from "url"
import { dirname } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

let indianGoldPrice = __dirname + "/indianGoldPrice.json"

async function saveToFile() {
	let data = await fetchAndScrape()
	let json = JSON.stringify(data, null, 4)

	fs.writeFile(indianGoldPrice, json, (err) => {
		if (err) {
			console.log(err)
		}
	})
}

export default saveToFile
export { indianGoldPrice }

import fetch from "node-fetch"
import * as cheerio from "cheerio"
import fs from "fs"

let array = [
	"India",
	"LBMA",
	"Malaysia",
	"Singapore",
	"Dubai",

	"Canada",
	"United States",
	"Mexico",

	"Peru",
	"Brazil",
	"Colombia",
	"Bolivia",
	"Argentina",
	"Venezuela",
	"Chile",
	"Suriname",
	"Dominican Republic",
	"Ecuador",
	"Guyana",

	"Bulgaria",
	"Finland",
	"Sweden",

	"Ghana",
	"South Africa",
	"Burkina Faso",
	"Mali",
	"Sudan",
	"DR Congo",
	"Guinea",
	"Zimbabwe",
	"Tanzania",
	"Ivory Coast",
	"Senegal",
	"Liberia",
	"Niger",
	"Madagascar",
	"Mauritania",

	"Russia",
	"Uzbekistan",
	"Kazakhstan",
	"Kyrgyzstan",

	"China",
	"Indonesia",
	"Turkey",
	"Philippines",
	"Mongolia",
	"Laos",

	"Australia",
	"Papua New Guinea",
	"New Zealand",
]

let query = (country) => `https://www.livepriceofgold.com/${country}-gold-price.html`

async function main() {
    
    let isValid = []
    let inValid = []
    let moreThanOneWord = []


    array.forEach(async element => {

        if(element.split(" ").length > 1) {
            moreThanOneWord.push(element)
			// asynchronously write to moreThanOneWord.txt
			fs.appendFile("moreThanOneWord.txt", `${element}\n`, (err) => {
				if(err) throw err
			})
        } else {
			let actual = element
            element = element.toLocaleLowerCase()
            console.log(`Checking ${element}...`)

            let url = query(element)
            let request = await fetch(url)
			console.log(`Status: ${request.status}`)
            let response = await request.text()

            let $ = cheerio.load(response)
            
            let img = $(".cleft.fleft.data-img.pad3")
            if(img.length > 0) {
                isValid.push(element)
				console.log(`Valid: ${element}`)
				// asynchronously write to valid.txt
				fs.appendFile("valid.txt", `${actual}=${element}\n`, (err) => {
					if(err) throw err
				})
            } else {
                inValid.push(element)
				console.log(`Invalid: ${element}`)
				// asynchronously write to invalid.txt
				fs.appendFile("invalid.txt", `${element}\n`, (err) => {
					if(err) throw err
				})
            }
        }

    })


	

    // save the data to data.js
    let data = `let countries = [\n`
    isValid.forEach(element => {
        data += `\t"${element}",\n`
    })
    data += `]\n\nexport default countries`
    fs.writeFileSync("data.js", data)

}

main()
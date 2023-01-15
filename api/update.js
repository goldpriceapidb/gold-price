import express from "express"
import Country from "../schemas/CountrySchema.js"
import { getCountryData } from "../utilities/fetchData.js"
import countries from "../data/countries.js"

const app = express()
const router = express.Router()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

router.get("/", (_, res) => {
	res.send({ message: "UPDATE API ONLINE" })
})

router.get("/all", async (_, res) => {
	try {
		res.sendStatus(202)
		await getAllStuffDone()
	} catch (error) {
		console.log(error)
		res.status(500).send({ error })
	}
})

router.get("/code/:code", async (req, res) => {
	const { code } = req.params

	let country = await addEntryToDatabase(code)
	res.status(200).send(country)
})

async function addEntryToDatabase(countryCode) {
	let data = await getCountryData(countryCode)

	let country = await Country.findOne({ countryCode })

	if (country == null) {
		console.log(
			`Country not found, creating new country...${data.countryName}`
		)
		let createdCountry = await Country.create({
			countryName: data.countryName,
			countryCode: data.countryCode,
			currency: data.currency,
			currentPrice: data.goldRate.rate,
			goldLastUpdated: data.goldRate.lastUpdated,
			currencyConversionRate: data.conversionRate.rate,
			currencyLastUpdated: data.conversionRate.lastUpdated,
		})

		return createdCountry
	} else {
		console.log(`Country found, updating country...${data.countryName}`)
		let lastKnownRate = country.currentPrice

		country = await Country.findByIdAndUpdate(
			country._id,
			{
				previousPrice: lastKnownRate,
				currentPrice: data.goldRate.rate,
				priceChange: data.goldRate.rate - lastKnownRate,
				priceChangePercentage:
					((data.goldRate.rate - lastKnownRate) / lastKnownRate) *
					100,
				goldLastUpdated: data.goldRate.lastUpdated,
				currencyConversionRate: data.conversionRate.rate,
				currencyLastUpdated: data.conversionRate.lastUpdated,
			},
			{ new: true }
		)
	}

	return country
}

async function getAllStuffDone() {
	new Promise(async (resolve, _) => {
		let count = 0
		let timeout = setTimeout(async function run() {
			await addEntryToDatabase(countries[count].countryCode)
			count++
			if (count < countries.length) {
				timeout = setTimeout(run, 100)
			} else {
				resolve()
			}
		})
	})
}

export default router
export { getAllStuffDone }
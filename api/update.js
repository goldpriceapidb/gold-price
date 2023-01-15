import express from "express"
import Country from "../schemas/CountrySchema.js"
import { getCountryData } from "../utilities/fetchData.js"

const app = express()
const router = express.Router()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

router.get("/", (_, res) => {
	res.send({ message: "UPDATE API ONLINE" })
})


router.get("/code/:code", async (req, res) => {
	const { code } = req.params

	let country = await Country.findOne({ countryCode: code })
	let data = await getCountryData(code)

	if (country == null) {
        console.log("Country not found, creating new country...")
		let newCountry = await Country.create({
			countryName: data.countryName,
			countryCode: data.countryCode,
			currency: data.currency,
			currentPrice: data.goldRate.rate,
			goldLastUpdated: data.goldRate.lastUpdated,
			currencyConversionRate: data.conversionRate.rate,
			currencyLastUpdated: data.conversionRate.lastUpdated,
		})
		return res.status(200).send(newCountry)
	}

    console.log("Country found, updating country...")

	let lastKnownRate = country.currentPrice

	country = await Country.findByIdAndUpdate(country._id, {
		previousPrice: lastKnownRate,
		currentPrice: data.goldRate.rate,
		priceChange: data.goldRate.rate - lastKnownRate,
		priceChangePercentage:
			((data.goldRate.rate - lastKnownRate) / lastKnownRate) * 100,
		goldLastUpdated: data.goldRate.lastUpdated,
		currencyConversionRate: data.conversionRate.rate,
		currencyLastUpdated: data.conversionRate.lastUpdated,
	}, { new: true })

	return res.status(200).send(country)
})

export default router

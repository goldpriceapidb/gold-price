import express from "express"
import Country from "../schemas/CountrySchema.js"
import {getIndia} from "../utilities/fetchData.js"
const app = express()
const router = express.Router()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

router.get("/", (_, res) => {
	res.send({ message: "COUNTRY API ONLINE" })
})

router.get("/india", async (_, res) => {
    try {
        const countries = await getIndia()
        console.log(countries)
        res.status(200).send({value:countries})
    } catch (error) {
        res.status(500).send({ error })
    }
})


router.get("/all", async (_, res) => {
    try {
        const countries = await Country.find({})
        res.status(200).send(countries)
    } catch (error) {
        res.status(500).send({ error })
    }
})

router.get("/code/:code", async (req, res) => {
    const { code } = req.params
    try {
        const country = await Country.findOne({ countryCode: code })
        res.status(200).send(country)
    } catch (error) {
        res.status(500).send({ error })
    }
})


export default router
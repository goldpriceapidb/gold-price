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

export default router

import mongoose from "mongoose"
const Schema = mongoose.Schema

const CountrySchema = new Schema({
    countryName: { type: String, required: true, trim: true },
    countryCode: { type: String, required: true, trim: true },
    currency: { type: String, required: true, trim: true },

    previousPrice: { type: Number, required: true },
    currentPrice: { type: Number, required: true },

    priceChange: { type: Number, required: true },
    priceChangePercentage: { type: Number, required: true },

    serverLastUpdated: { type: Date, required: true },
    currencyLastUpdated: { type: Date, required: true },
}, { timestamps: true })

let Country = mongoose.model('Country', CountrySchema)
export default Country

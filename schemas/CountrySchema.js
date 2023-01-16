import mongoose from "mongoose"
const Schema = mongoose.Schema

const CountrySchema = new Schema({
    countryName: { type: String, required: true, trim: true },
    countryCode: { type: String, required: true, trim: true },
    currency: { type: String, required: true, trim: true },

    previousPrice: { type: Number },
    currentPrice: { type: Number, required: true },

    priceChange: { type: Number },
    priceChangePercentage: { type: Number },

    goldLastUpdated: { type: Date, required: true },

    currencyConversionRate: { type: Number, required: true }
}, { timestamps: true })

let Country = mongoose.model('Country', CountrySchema)
export default Country

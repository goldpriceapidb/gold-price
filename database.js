import mongoose from "mongoose"
mongoose.set("strictQuery", false)

class Database {
    constructor() {
        this._connect()
    }

    _connect() {
        mongoose
            .connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then(() => {
                console.log("Database connection successful")
            })
            .catch((err) => {
                console.error("Database connection error")
                console.log(err)
            })
    }
}

export default Database
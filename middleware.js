let cors = (req, res, next) => {
	const ACCESS_TYPE = "PUBLIC"

	const ALLOWED_ORIGINS = ["http://localhost:3003", "http://localhost:3000"]

	let origin = req.headers.origin
	if (ACCESS_TYPE === "PUBLIC") {
		if (origin !== undefined) {
			res.setHeader("Access-Control-Allow-Origin", origin)
		}
	} else {
		if (ALLOWED_ORIGINS.includes(origin)) {
			res.setHeader("Access-Control-Allow-Origin", origin)
		} else {
			console.log({
				origin,
				message: "Origin not allowed",
				status: "nope",
				method: req.method,
			})
		}
	}

	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE",
		"OPTIONS"
	)
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
	res.setHeader("Access-Control-Allow-Credentials", true)
	res.setHeader("Vary", "Origin")
	return next()
}

export { cors }

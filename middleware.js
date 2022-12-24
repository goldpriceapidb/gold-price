let cors = (req, res, next) => {
	let allowedOrigins = [
		"http://localhost:3003",
		"http://localhost:3000",
		"https://meowit.netlify.app",
		"https://meowit.pages.dev",
	]
	let origin = req.headers.origin


    // Allow all origins
    res.setHeader("Access-Control-Allow-Origin", origin)

    // Allow only specific origins
	/* 
    if (allowedOrigins.includes(origin)) {
		res.setHeader("Access-Control-Allow-Origin", origin)
	} else
		console.log({
			origin,
			message: "Origin not allowed",
			status: "nope",
			method: req.method,
		})
    */


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


export default cors
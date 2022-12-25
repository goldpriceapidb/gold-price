import fetch from "node-fetch"

async function getContent(sourceURL) {
	let response = await fetch(sourceURL)
	let data = await response.text()
	return data
}

export default getContent
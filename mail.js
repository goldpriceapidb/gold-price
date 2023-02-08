import fetch from "node-fetch"

let data = {
	service_id: "service_3my3s1s",
	template_id: "template_rld89ic",
	user_id: "YwEZ6_J84gx8JglSG",
	template_params: {
		from_name: "Meow Man",
		to_name: "The Simp guy",
		message: "You got a response from a user",
		reply_to: "tharunoptimus@outlook.com",
		copyTo: "worldisfullofmeow@gmail.com"
	},
}

async function sendContent() {
	try {
		let request = await fetch(
			"https://api.emailjs.com/api/v1.0/email/send",
			{
				method: "POST",
				body: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
		console.log("Sent successfully")
		request = await request.text()
		console.log(request)
	} catch (error) {
		console.log(error)
		console.log("Error sending mail")
	}
}

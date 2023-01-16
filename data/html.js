let content = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            margin: 0;
            padding: 0;
            min-height: 100vh;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        span {
            text-align: center;
            max-width: 500px;
            font-size: 1.5rem;
            padding: 0 1rem;
        }
        img {
            margin-bottom: 1rem;
            border-radius: 50%;
        }
        code {
            font-size: 1.1rem;
        }

        .wrapper {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        .api {
            margin-top: 1rem;
            font-size: 1.1rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            max-width: 300px;
        }
        .api span {
            margin-bottom: 0.5rem;
            border: 1px solid #00000029;
            padding: 0.3rem;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
        }
        .route {
            border: 1px solid #00000045;
            padding: 0.1rem;
            border-radius: 4px;
            background-color: black;
            color: white;
        }

    </style>
    <title>Gold Rate for 50 Countries in Native Currency with USD Conversion Rate - Powered By Angris</title>
</head>

<body>
    <div class="wrapper">
        <img src="https://github.com/goldpriceapidb.png" alt="Gold Price API DB" width="200" height="200">
        <span>Gold Rate for 50 Countries in Native Currency with USD Conversion Rate</span>
        <br>
        <span>Powered By ANGRIS</span>
        <br>

        <div class="api">
            <span><code class="route">/api/country/code/:countryCode</code><code> - Returns the gold rate for a country </code></span>
            <span><code class="route">/api/country/all</code><code> - Returns the gold rate for all countries </code></span>
            <span><code class="route">/api/update/code/:countryCode</code><code> - Updates the gold rate for all countries </code></span>
            <span><code class="route">/api/update/all</code><code> - Updates the gold rate for all countries </code></span>
        </div>
    </div>
</body>

</html>`

export default content
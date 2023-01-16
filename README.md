# Get the Price for Gold for 50 Countries 
(In Native Currency - USD Conversion Rate Included)
Look at [Countries.js](data/countries.js) to view the list of countries

## Libraries Used
- `node-fetch` to fetch the data from the website
- `cheerio` to parse the data from the website
- `express` web framework for node.js
- `mongoose` to connect to the database
- `mongodb` mongodb database driver for node.js
- `date-fns-tz` to get the current date and time in a specific timezone
- `dotenv` to load environment variables from a .env file

## Websites Used for Scraping Data
- [livepriceofgold](https://www.livepriceofgold.com)
- [goldpricez](http://goldpricez.com)

## How to use
- Clone the repository
- Run `npm install` to install the dependencies
- Run `npm start` to start the server
- Open `localhost:3003` in your browser

## How it works
- The server fetches the data from the website
- The data is parsed using cheerio
- The data is sent to the client with the help of express

## How to contribute
- The repository is not accepting any contributions at the moment

## Endpoints
- `/` - Home page
- `/ping` - Check if the server is running
- `/api/countries/all` - Get all the countries
- `/api/countries/code/:country` - Get the price for a specific country with the country code
- `/api/update/all` - Refetch and update the data for all the countries
- `/api/update/code/:country` - Refetch and update the data for a specific country with the country code

## License
[MIT](https://choosealicense.com/licenses/mit/)
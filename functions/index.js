const functions = require('firebase-functions');
const WBK = require('wikibase-sdk');
const axios = require('axios').default;
const wiki = require('wikijs').default;
const cors = require('cors');

const corsHandler = cors({origin: true})

const MAX_CHARS_SUMMARY = 200;
const LANGUAGE_SUMMARY = 'de'

// This initializes the wikidata-sdk library
// The defined endpoints forward any request to the official Wikipedia API
const wbk = WBK({
  instance: 'https://www.wikidata.org',
  sparqlEndpoint: 'https://query.wikidata.org/sparql',
})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.getWikiData = functions.region('europe-west1').https.onRequest( async (request, response) => {
  corsHandler(request, response, async (err) => {
    if (err) {
      response.status(400).send('Cors err: ' + err);
      return;
    }

    // e.g.: ?city=London
    const city = request.query.city;
    let output = {}

    if (!city || city.length < 1) {
      response.status(400).send('Please provide a city');
      return;
    }

    // Get the city data from the SPARQL query
    let sparqlQuery = `
      SELECT 
      ?town 
      ?townLabel 
      ?area 
      ?population 
      ?country 
      ?countryLabel 
      (GROUP_CONCAT(?postalCode; separator=", ") AS ?postalCodes)
      WHERE {
        ?town ?label "${city}"@de.
        ?town wdt:P2046 ?area.
        ?town wdt:P1082 ?population.
        ?town wdt:P17 ?country.
        OPTIONAL { 
          ?town wdt:P281 ?postalCode
        }. 
        SERVICE wikibase:label { 
          bd:serviceParam wikibase:language "[AUTO_LANGUAGE], de". 
        }
      }
      group by ?town ?townLabel ?area ?population ?country ?countryLabel
      `

    const url = wbk.sparqlQuery(sparqlQuery)

    let cityData
      
    // Fetch the data from the SPARQL query
    try {
      await axios.get(url).then(response => {
        cityData = response.data.results.bindings[0]
      })
    } catch (error) {
      functions.logger.error(error, {structuredData: true});
      response.status(400).send(error);
      return
    }

    output.population = cityData.population?.value
    output.area = cityData.area?.value
    output.country = cityData.countryLabel?.value
    output.postalCodes = cityData.postalCodes?.value

    await wiki({ apiUrl: 'https://en.wikipedia.org/w/api.php' }).page(city).then(async page => {

      await page.fullInfo().then(async info => {

        // Check which value is set. Wikipedia has different key-names for 
        // the mayor or leader of a city (well done wikipedia).
        if (info.general.mayor){
          output.mayor = info.general.mayor
        }else if (typeof(info.general.governingBody) === Array){
          output.mayor = info.general.governingBody[1]
        }else if (info.general.leaderName) {
          output.mayor = info.general.leaderName
        }else {
          // If none of the values was set, then set it to undefined.
          output.mayor = undefined
        }

        output.website = info.general.website
      })

      await page.mainImage().then(imageUrl => {
        output.image = imageUrl
      })
    })

    await wiki({ apiUrl: `https://${LANGUAGE_SUMMARY}.wikipedia.org/w/api.php` }).page(city).then(async page => {

      output.url = page.fullurl
          
      await page.summary().then(summary => {
        let outputSummary
        outputSummary = summary.substring(0, MAX_CHARS_SUMMARY)
        outputSummary += '...'
        output.summary = outputSummary
      })

    })


    functions.logger.info("Returned an object with all the necessary data of wikipedia", {structuredData: true});
    response.send(output);
  })
});

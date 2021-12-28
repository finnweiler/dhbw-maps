import WBK from 'wikidata-sdk'
import axios from 'axios'
import wiki from 'wikijs'

// Maximum number of characters in the summary
const MAX_CHARS_SUMMARY = 200

// Initialize the wikibase-sdk
const wbk = WBK({
  instance: 'https://www.wikidata.org',
  sparqlEndpoint: 'https://query.wikidata.org/sparql',
})


async function getCityData (city) {

  // Get the city data from the SPARQL query
  let query = `
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

  // Get the url of the SPARQL query to fetch the data
  const url = wbk.sparqlQuery(query)

  let res
    
  // Fetch the data from the SPARQL query
  await axios.get(url).then(response => {
    res = response.data.results.bindings[0]
  })

  // Return the data
  return res
    
}

async function getWikiData (city) {
  let output = {}

  // Get the results of the SPARWL query which contains all information about the city
  let cityData = await getCityData(city)

  // Write the city data to the output object
  output.population = cityData.population?.value
  output.area = cityData.area?.value
  output.country = cityData.countryLabel?.value
  output.postalCodes = cityData.postalCodes?.value

  // Get the wikipedia page of the city
  // -> Changing the language here might break the result
  await wiki({ apiUrl: 'https://en.wikipedia.org/w/api.php' }).page(city).then(async page => {

    // Link to the wikipedia page
    output.url = page.fullurl

    // Get the mayor of the city
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

      // Get the website of the city
      output.website = info.general.website

      // Get all information about the city (DO NOT USE THIS)
      // output.raw = info.general;
    })

    // Get the page image of the Wiki page
    await page.pageImage().then(image => {
      output.image = image
    })
  })

  // Get the summary of the wikipedia page
  // Notice: You can change the language of the wikipedia summary in apiUrl
  await wiki({ apiUrl: 'https://de.wikipedia.org/w/api.php' }).page(city).then(async page => {
        
    // Get the summary 
    await page.summary().then(summary => {
      let outputSummary
      outputSummary = summary.substring(0, MAX_CHARS_SUMMARY)
      outputSummary += '...'
      output.summary = outputSummary
    })

  })

  return output
}

export default getWikiData
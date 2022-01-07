import axios from 'axios'

const SERVERLESS_URL = 'https://europe-west1-webeng-6d42d.cloudfunctions.net/getWikiData'

async function getWikiData(city) {
  let response = await axios.get(`${SERVERLESS_URL}?city=${city}`)
  return response.data
}

export default getWikiData

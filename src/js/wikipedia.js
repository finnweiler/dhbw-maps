import axios from 'axios'

// Maximum number of characters in the summary
const SERVERLESS_URL = null

async function getWikiData (city) {

  
  try {
    let response = await axios.get(`${SERVERLESS_URL}?city=${city}`)

    return response.data
  }catch (err) {
    console.error(err)
    
    return err
  }

}

export default getWikiData
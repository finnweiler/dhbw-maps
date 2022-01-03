import axios from 'axios'

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
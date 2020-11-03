const axios = require('axios');
const uri = process.env.API_EXTERNAL_URI;

const StandingsService = {
  async list() {
    try {
      return await axios.get(uri, 
        { 
          headers: { 
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",  
            Accept: "application/json; charset=UTF-8",
          }  
        })
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = StandingsService;
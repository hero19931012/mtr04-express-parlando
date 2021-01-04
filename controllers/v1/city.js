const db = require('../../models')
const { Address_city } = db

const cityController = {
  getAll: async (req, res) => {
    try {
      const cities = await Address_city.findAll()

      res.status(200).json({
        success: true,
        data: {
          cities: cities.map((city) => {
            const { id, cityName } = city
            return { id, cityName }
          })
        }
      })
    } catch (err) {
      console.log(`get all cities error: ${err.toString()}`);
      res.status(500).json({
        success: false,
        message: err.toString()
      })
    }
  }
}

module.exports = cityController
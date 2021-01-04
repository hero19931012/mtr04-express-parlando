const db = require('../../models')
const { Address_district } = db

const districtController = {
  getAll: async (req, res) => {
    const { cityId } = req.query

    try {
      const districts = await Address_district.findAll({
        where: { cityId }
      })

      res.status(200).json({
        success: true,
        data: {
          districts: districts.map((district) => {
            const { id, districtName } = district
            return { id, districtName }
          })
        }
      })
    } catch (err) {
      console.log(`get districts error: ${err.toString()}`);
      res.status(500).json({
        success: false,
        message: err.toString()
      })
    }
  }
}

module.exports = districtController
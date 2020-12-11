const { render } = require("ejs")

const indexController = {
  index: (req, res) => {
    render('index')
  }
}

module.exports = indexController;
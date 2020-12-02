const userController = {
  async index(ctx) {
    await ctx.render('index')
  },

}

module.exports = userController;
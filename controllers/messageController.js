const messageController = {
  async index(ctx) {
    await ctx.render('index')
  },

}

module.exports = messageController;
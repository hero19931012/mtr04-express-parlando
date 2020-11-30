const Koa = require('koa');
const logger = require('koa-logger');
const Router = require('koa-router');
const views = require('koa-views');

const app = new Koa();

const port = 3001;

const messageController = require('./controllers/messageController')

/** 
在此可組合各種 Middleware
**/


// koa-logger
app.use(logger())

app.use(async (ctx, next) => {
  const start_time = Date.now();
  await next();
  const ms = Date.now() - start_time;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});


// koa-views
app.use(views(__dirname + '/views', {
  extension: 'ejs' 
}));


// koa-router
const router = Router();
router.get('/', messageController.index);

router.get('/edit/:id', async (ctx) => {
  await ctx.render('edit')
});

app.use(router.routes());

app.listen(port, () => {
  console.log(`koa listening post:${port}`);
});

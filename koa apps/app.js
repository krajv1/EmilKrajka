const Koa = require('koa');
const app = new Koa();

// Middleware obsługujące routing
app.use(async (ctx) => {
  if (ctx.path === '/hello') {
    ctx.body = 'Hello, world';
  } else if (ctx.path === '/goodbye') {
    ctx.body = 'Goodbye, world';
  } else {
    ctx.status = 404;
    ctx.body = 'Page not found';
  }
});

// Uruchomienie serwera
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}/`);
});
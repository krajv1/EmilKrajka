const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');
const path = require('path');
const koaBody = require('koa-body');

const app = new Koa();
const router = new Router();

app.use(koaBody());

// Obsługa GET /login
router.get('/login', (ctx) => {
    try {
        const htmlPath = path.join(__dirname, 'login.html');
        ctx.type = 'html';
        ctx.body = fs.createReadStream(htmlPath);
    } catch (err) {
        ctx.status = 500;
        ctx.body = 'Błąd serwera: ' + err.message;
    }
});

// Obsługa POST /login
router.post('/login', (ctx) => {
    const { username, password } = ctx.request.body;

    if (!password || password.length < 8) {
        ctx.status = 400;
        ctx.body = 'To hasło jest zbyt krótkie';
        return;
    }

    if (username === 'admin' && password === 'adminadmin') {
        ctx.redirect('/welcome');
    } else {
        ctx.status = 401;
        ctx.body = 'Nieprawidłowa nazwa użytkownika lub hasło';
    }
});

// Strona powitalna
router.get('/welcome', (ctx) => {
    ctx.type = 'html';
    ctx.body = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Witaj!</title>
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
                    height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0;
                    color: white;
                }
                .card {
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    border-radius: 20px;
                    padding: 40px;
                    text-align: center;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
                    max-width: 500px;
                    width: 90%;
                }
                h1 {
                    font-size: 2.5rem;
                    margin-bottom: 20px;
                }
                .btn {
                    display: inline-block;
                    margin-top: 25px;
                    padding: 12px 30px;
                    background: white;
                    color: #2575fc;
                    text-decoration: none;
                    border-radius: 30px;
                    font-weight: bold;
                    transition: all 0.3s ease;
                }
                .btn:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
                }
                .checkmark {
                    font-size: 5rem;
                    margin-bottom: 20px;
                }
            </style>
        </head>
        <body>
            <div class="card">
                <div class="checkmark">✓</div>
                <h1>Zalogowano pomyślnie!</h1>
                <p>Witaj, administratorze! Jesteś teraz zalogowany w systemie.</p>
                <a href="/login" class="btn">Wyloguj się</a>
            </div>
        </body>
        </html>
    `;
});

app.use(router.routes());
app.use(router.allowedMethods());

// Użyj bezpiecznego portu 8000
const PORT = 8000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`---------------------------------------------------`);
    console.log(` Serwer działa na http://localhost:${PORT}`);
    console.log(` Formularz logowania: http://localhost:${PORT}/login`);
    console.log(`---------------------------------------------------`);
    console.log(` Bezpieczne porty: 3000, 5000, 8000, 8080`);
    console.log(`---------------------------------------------------`);
});
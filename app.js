const cookie = require('./cookies');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

const cookieParser = require('cookie-parser')
app.use(cookieParser());

app.get('/', (req, res) => {
    res.status(200).contentType('text/html').render('index');
});

app.get('/todo', (req, res) => {
    res.status(200).contentType('text/html').render('todo', { query: req.query, todos: req.cookies });
});


app.post('/todo', urlencodedParser, (req, res) => {
    if (!req.body) return res.sendStatus(400);
    let id = cookie.setCookie(req, res);
    res.status(204).redirect(`/todo/${Number(id)}`);
});

app.get('/todo/:id', (req, res) => {
    let query = req.query;
    if (query.done) cookie.updateCookie(req, res); 
    res.status(200).contentType('text/html').render('todo_show', { todo: cookie.getCookie(req) });
});

app.post('/todo/:id', (req, res) => {
    cookie.delCookie(req, res); 
    res.status(200).redirect(`/todo`);

});

app.delete('/todo', (req, res) => {
    // console.log('delete');
});

app.get('/history', (req, res) => {
    res.status(200).contentType('text/html').render('history', { query: req.query, todos: req.cookies });
});

app.get('*', (req, res) => {
    res.status(404).sendFile(`${__dirname}/assets/templates/404.html`);
});


const PORT = process.env.PORT || 3000;
let server = app.listen(PORT, () => {
    console.log('server is running on port', server.address().port);
});


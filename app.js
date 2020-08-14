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
    // res.cookie('id', )
    let id = req.cookies.id || 1;
    res.cookie(`id`, Number(id)+1);
    req.body.id = id;
    res.cookie(`todo${id}`, req.body);
    console.log('Cookies: ', req.cookies);
    res.status(204).redirect(`/todo/${Number(id)}`);
});

app.get('/todo/:id', (req, res) => {
    let data = {
        id: req.params.id,
        title: "todo",
        tasks: ['task1', 'task2', 'task3'],
    }
    let todo = req.cookies[`todo${req.params.id}`];
    console.log('Cookies: ', todo);
    res.status(200).contentType('text/html').render('todo_show', { todo: todo });
});

app.delete('/todo', (req, res) => {

});

app.get('/history', (req, res) => {
    res.status(200).contentType('text/html').render('history');
});

app.get('*', (req, res) => {
    res.status(404).sendFile(`${__dirname}/assets/templates/404.html`);
});


const PORT = process.env.PORT || 3000;
let server = app.listen(PORT, () => {
    console.log('server is running on port', server.address().port);
});


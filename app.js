const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

app.get('/', (req, res) => {
    res.status(200).contentType('text/html').render('index');
});

app.get('/todo', (req, res) => {
    let query = req.query;
    res.status(200).contentType('text/html').render('todo', { query: query });
});

app.get('/todo/:id', (req, res) => {
    let data = {
        id: req.params.id,
        title: "todo",
        tasks: ['task1', 'task2', 'task3'],
    }
    res.status(200).contentType('text/html').render('todo_show', { data: data });
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


const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const tree = require('./lib/tree');
const db = require('./lib/db');
const allWorks = db.get('works').value();

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    tree.getAllList(allWorks).then( (worksList) => {
        res.render('index', { worksList : worksList })
    })
})

app.get('/svg-test', (req, res) => {
    res.render('svg-test')
})
app.get('/svg-test2', (req, res) => {
    res.render('svg-test2')
})

app.get('/work/:id', (req, res) => {
    res.send( db.get('works').find({ id:parseInt(req.params.id) }).value())
})


app.listen(port, () =>{
    console.log('start! ', port);
});
var express = require('express');
var exphbs  = require('express-handlebars');

var Promise = global.Promise || require('promise');
var app = express();

var data = require('./data.json');

var config = {
    defaultLayout: 'main',
    partialsDir: [
        'views/partials/'
    ]
};

app.engine('handlebars', exphbs(config));
app.set('view engine', 'handlebars');


app.get('/', function (req, res) {
    res.render('home', {'data': data});
});



app.listen(3000);
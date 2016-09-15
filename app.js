var express = require('express');
var exphbs  = require('express-handlebars');
var app = express();

var data = require('./data.json');

var config = {defaultLayout: 'main'};

app.engine('handlebars', exphbs(config));
app.set('view engine', 'handlebars');
// TODO add cacching of tempates app.enable('view cache');

app.get('/', function (req, res) {
    res.render('home', {'data': data});
});

// app.use(express.static('public'));

app.listen(3000);
var express = require('express');
var exphbs  = require('express-handlebars');
var app = express();

var sports = require('./sport');


var config = {defaultLayout: 'main'};

app.engine('handlebars', exphbs(config));
app.set('view engine', 'handlebars');
// TODO add cacching of tempates app.enable('view cache');

app.get('/', function (req, res) {
    res.render('home', {'sports': sports.sports()});
});

// app.use(express.static('public'));

app.listen(3000);
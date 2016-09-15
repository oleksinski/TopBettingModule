var express = require('express');
var exphbs  = require('express-handlebars');

var Promise = global.Promise || require('promise');
var app = express();


var utils = require('./utils' ).utils;

var config = {
    defaultLayout: 'main',
    partialsDir: [
        'views/partials/'
    ]
};

app.engine('handlebars', exphbs(config));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render('home', {'tabs': utils.getTabs()});
});

app.get('/:period/:sport', function (req, res) {
    var period = req.params.period;
    var sport = req.params.sport;
    var sportData = utils.dataByPeriodAndSportName(period, sport);
    res.render('sports', {'sports': sportData, layout:false});
});

app.listen(3000);
var express = require('express');
var exphbs = require('express-handlebars');
var app = express();
var data = require('./helper/data').data;
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
    res.render('home', {'tabs': data.getTabs()});
});

app.get('/:tabId/:sportAlias', function (req, res) {
    var tabId = req.params.tabId;
    var sportAlias = req.params.sportAlias;
    res.render('sports', {'sports': data.getAllSportsWithEventsForTabAndSportAlias(tabId, sportAlias), layout: false});
});

app.listen(3000);
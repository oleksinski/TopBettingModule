var express = require('express');
var exphbs  = require('express-handlebars');
var app = express();

//var sports = require('sports');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home', {'sports': {}});
});

// app.use(express.static('public'));

app.listen(3000);
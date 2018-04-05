var express = require('express');
var path = require('path');
var app = express();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

app.use('/static', express.static(path.join(__dirname + '/dist/static')));

app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});

app.listen(process.env.PORT || 3000, function() {
    console.log(`${process.env.NODE_ENV}: listening...`);
});
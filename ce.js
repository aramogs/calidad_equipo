const express = require('express');
const app = express();
const db = require('./public/db/conn');
const bodyParser = require('body-parser');
const mailer = require('express-mailer');
require('dotenv').config();

app.set('views',__dirname + '/views');
app.set('view_engine', 'ejs');


app.use(express.static('public'));
app.use(express.static('node_modules'));
//Requiriendo rutas
const routes = require('./routes/routes');


app.get(db);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(routes);

app.set('port', process.env.PORT || 3004);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
  console.log('Express server connected as '+ process.env.enviroment + " enviroment");
});
  module.exports= mailer;
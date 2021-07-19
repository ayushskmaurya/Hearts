const express = require('express');
const exphbs  = require('express-handlebars');
const path = require('path');

const app = express();
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/', require(path.join(__dirname, 'routes/hearts.js')));
app.use(express.static(path.join(__dirname, "public")));

app.listen(3000);

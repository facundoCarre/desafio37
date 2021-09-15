const express = require('express');
//const instacncia = new productos();
// creo una app de tipo express
const handlebars = require("express-handlebars")
const app = express();
const dotenv = require('dotenv');
dotenv.config();

app.engine('hbs', handlebars({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', 'hbs');
app.set('views', './views');
//const productosRouter = express.Router();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
//require('./database/coneccionMongo');

const serverRouter = require('./routes/serverRoutes');
app.use(serverRouter);
// pongo a escuchar el servidor en el puerto indicado
const puerto = process.env.PORT || 8080;
const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});
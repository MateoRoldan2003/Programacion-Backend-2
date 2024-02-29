// server.js
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const config = require('./config');
const passportMiddleware = require('./middlewares/passportMiddleware');

const app = express();

mongoose.connect(config.mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: config.sessionSecret, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(passportMiddleware.initialize());

const rutasAutenticacion = require('./rutas/autenticacion');
app.use('/autenticacion', rutasAutenticacion);

const PUERTO = config.puerto;
app.listen(PUERTO, () => {
  console.log(`El servidor está corriendo en el puerto ${PUERTO}`);
});


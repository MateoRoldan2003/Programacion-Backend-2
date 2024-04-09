const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const config = require('./config');
const passportMiddleware = require('./middlewares/passportMiddleware');
const errorMiddleware = require('./middlewares/errorMiddleware');
const multer = require('multer');

const app = express();

mongoose.connect(config.mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: config.sessionSecret, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(passportMiddleware.initialize());

const upload = multer({ dest: 'uploads/' });

app.post('/api/pets/withimage', upload.single('image'), (req, res) => {

  const petName = req.body.name;
  const petImage = req.file;

  res.status(201).json({ pet: { name: petName, image: petImage } });
});

const usersRoutes = require('./routes/api/users');
app.use('/api/users', usersRoutes);

app.use(errorMiddleware);

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require('express');
const app = express();
const mongoose = require('mongoose');

const FakeDb = require('./fake-db');

// const rentalRoutes = require('./routes/rentals');
// const userRoutes = require('./routes/users');

mongoose.connect('mongodb+srv://jrairbnb:' + process.env.MONGO_ATLAS_PW + '@airbnb-gnhtv.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, () => {
    console.log('Connected to MongoDB React Airbnb database!');
})
.then(() => {
    const fakeDb = new FakeDb();
    fakeDb.seedDb();
    console.log('Data seeded to database!');
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

// app.use((req, res, next) => {
//     res.status(200).json({
//         message: 'Airbnb server works!!'
//     });
// });

// app.use('/rentals', rentalRoutes);
// app.use('/users', userRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;

/*
const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3001;

const server = http.createServer(app);

server.listen(port);
*/
const express = require('express');
const mongoose = require('mongoose');

const actors = require('./routers/actorroute');
const movies = require('./routers/movieroute');

const app = express();

app.listen(8080);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/2095db', function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');

});

//Configuring Endpoints
//Actor RESTFul endpoionts 
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.post('/actors/:id/movies', actors.addMovie);
app.delete('/actors/:id', actors.deleteOne);
app.delete('/actors/:aId/:mId',actors.deleteMovie);
app.delete('/deleteactors/:id',actors.deleteactor);

//Movie RESTFul  endpoints
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);
app.post('/movies/:id/actors', movies.addActor);
app.delete('/movies/:mid/:aid',movies.deleteActor);
app.get('/deletemovies/:year1/:year2',movies.deleteMovie);
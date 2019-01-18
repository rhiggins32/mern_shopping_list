const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require ('path');

//Bring in item routes
const items = require ('./routes/api/items');

//initialize express
const app = express();


//Bodyparser middleware to parse the JSON 
app.use(bodyParser.json());

//Mongo DB config 
const db =  require('./config/keys').mongoURI;

//Connect to Mongo
mongoose
    .connect(db, {useNewUrlParser: true}) 
    .then(() =>console.log('MongoDB Connected..'))
    .catch(err => console.log(err));

//Use Routes
app.use('/api/items', items)

//Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));

    })
}
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
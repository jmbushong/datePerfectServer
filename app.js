require('dotenv').config();
const Express= require('express');
const app= Express();

const database= require('./db');
database.sync();
app.use(Express.json()); //brings in JSON parser for backend

app.use(Express.static(__dirname+ '/public')); //shows us what's in html file

app.get('/', (req, res) => res.render('index'))//establishes endpoint to .html

const user = require('./controllers/usercontroller')
app.use('/user', user);

const profile= require('./controllers/profilecontroller')
app.use('/profile', profile)


app.listen(process.env.PORT, () => console.log(`App is listening on ${process.env.PORT}`))
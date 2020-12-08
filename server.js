const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profileid = require('./controllers/profileid');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : 'postgresql-curved-19160',
    user : 'postgres',
    password : 'yellow',
    database : 'smartbrain' 
  } 
});


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get( '/' , (req, res) => { 
	res.send('It is working');
});

app.post( '/signin' , (req, res) =>{ 
	signin.handleSignin (req, res, db, bcrypt)
});

app.post('/register', (req, res) => { 
	register.handleRegister(req, res, db, bcrypt) 
});

app.get('/profile/:id', (req , res )=>{
	profileid.handleProfileid(req, res, db)
})

app.put('/image', (req, res) =>{
	image.handleImage(req, res, db)
})

app.post('/imageurl', (req, res) =>{
	image.handleApiCall(req, res)
})

app.listen(process.env.PORT || 3001, ()=> {
	console.log(`app is runing on port ${process.env.PORT}`)
});


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
    host : '127.0.0.1',
    user : 'postgres',
    password : 'yellow',
    database : 'smartbrain' 
  }
});


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get( '/' , (req, res) => {
	res.send(database.users);
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

app.listen(3001);


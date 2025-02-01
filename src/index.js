const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');

const port = process.env.port || 4000;
const app = express();

const REDIS_HOST = 'redis';
const REDIS_PORT = '6379';


const client = redis.createClient({
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`
  });

client.on('error', err => console.log('Redis Client Error', err));
client.on('connect', err => console.log('It working Good connect to redis'));
client.connect();


const DB_USER='root';
const DB_PASSWORD='example';  
const DB_HOST = 'mongo';
const DB_PORT =  '27017';

const URI =`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;

mongoose.connect(URI)
.then(()=>console.log('connect to database'))
.catch((err)=>console.log('error to connect to database',err));

app.get('/',(req,res)=> {
    client.set('name','mostafa saadoun using docker hub')
    res.send('<h1> Hallo i\'m on docker course thanks </h1>')
});


app.get('/saadoun',async (req,res)=>{
    const name = await client.get('name');
    res.send(`<h1> Hallo  ${name} </h1>`);
});


app.listen(port,()=>console.log(`app is up and running on port :${port}`));
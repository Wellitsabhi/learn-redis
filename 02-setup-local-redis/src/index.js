import express from 'express';
import  Redis from 'ioredis';
import  mongoose, { mongo } from 'mongoose';

// initiate express app
const app = express();

// intiate redis
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

// ping redis
app.get('/redis', async (req,res)=>{
    const reply = await redis.ping();
    res.json({redis: reply});
})

// ping mongo
app.get('/mongo', async (req,res)=>{
    const url = process.env.MONGO_URL || 'mongodb://localhost:27017/learn_redis';

    if(mongoose.connection.redayState === 0 ){
        await mongoose.connect(url);
    }
    console.log(mongoose.connection.name);
    res.json({mongo:"connected", database: mongoose.connection.name});
})

app.listen(3000, ()=>{
    console.log("Port sprinting on 3000");
})

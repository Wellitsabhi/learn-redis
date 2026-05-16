import express from 'express';
import Redis from 'ioredis';

const app =  express();
// to parse json body , form s and file uplaods are not json format
app.use(express.json());

// initialize redis
const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");
// banner key
const BANNER_KEY = "app:banner";


// set banner , usually form db
app.post("/banner", async(req,res)=>{
    await redis.set(BANNER_KEY, req.body.message || "Welcome to Learn Redis project");
    res.json({success: true});
})


// to use banner 
app.get("/banner", async (req,res)=>{
    const message = await redis.get(BANNER_KEY);
    res.json({message});
})

// to delete banner
app.delete("/banner", async (req,res)=>{
    await redis.del(BANNER_KEY);
    res.json({success: true});
})

// check if key exists in db
app.get("/banner/exists",  async (req,res)=>{
    const exists = await redis.exists(BANNER_KEY);
    // res.json({exists: exists});
    res.json({exists: Boolean(exists)});
})


// listen your app
app.listen(3000,()=>{
    console.log("Server sprinting on 3000");
})
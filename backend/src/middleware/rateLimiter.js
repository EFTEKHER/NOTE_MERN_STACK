import ratelimit from "../config/upstash.js";


const rateLimiter =async (req, res, next) => {

    try{
 const { success } = await ratelimit.limit("my-rate-limit");
 if (!success) {
     return res.status(429).json({ message: "Rate limit exceeded" });
 }
    next();
    }
    catch(err){
        console.error("Rate limiter error:", err);
        next(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export default rateLimiter;
const jwt= require("jsonwebtoken")
const tokenBlacklistModel= require("../models/balcklist.model")

async function authUser(req,res,next){
    // Check cookie first, then fall back to Authorization header
    let token = req.cookies.token
    if(!token && req.headers.authorization){
        const parts = req.headers.authorization.split(' ')
        if(parts.length === 2 && parts[0] === 'Bearer'){
            token = parts[1]
        }
    }

    if(!token){
        return res.status(401).json({
            message:"Token not provided"
        })
    }


    const isBlacklisted= await tokenBlacklistModel.findOne({
        token
    })

    if(isBlacklisted){
        return res.status(401).json({
            message:"Token is invalid"
        })
    }

    try{
  const decoded=  jwt.verify(token, process.env.JWT_SECRET)

        req.user= decoded

        next()
    }
    catch(err){
        return res.status(401).json({
            message:"Invalid Token"
        })
    }
}

module.exports= { authUser}
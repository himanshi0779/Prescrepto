import jwt from 'jsonwebtoken'

//admin authentication middleware
const authAdmin= async (req,res,next)=>{
    try{
        const token=req.headers.atoken;
        if (!token){
            return res.json({success:false,message:'Not Authorized Login Again'})
        }
        const decoded= jwt.verify(token,process.env.JWT_SECRET);
        if (!decoded || !decoded.email) {
    return res.json({ success: false, message: "Not Authorized Login Again" });
}

        req.admin=decoded;
        console.log("Decoded token",decoded);
        console.log("Expected email:",process.env.ADMIN_EMAIL);
        next();
    } catch(error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
} 

export default authAdmin;
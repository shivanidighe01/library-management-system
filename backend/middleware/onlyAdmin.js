export const adminOnly=(req,res,next)=>{
    if(req.user?.role!=='Admin')
    {
        return res.status(400).json({
            success:false,
            message:"Access denied your not an admin"
        });
    }
    next();

}
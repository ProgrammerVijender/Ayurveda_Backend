import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try{
        console.log("work");
        const token = req.cookies.token;

        if(!token)
        {
            return res.status(401).json({
                message: "User not authenticated",
                success:false
            })
        }

        const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        if(!decode)
            {
                return res.status(401).json({
                    message: "Token is Invalid",
                    success:false
                })
            };
            console.log(decode)
            // req = decode;
            req.id = decode.userid;
            req.fullname = decode.fullname;
            // console.log(decode.userid)
        
        next();
        }
        catch(error)
        {
           console.log(error);
        }
}

export default isAuthenticated;
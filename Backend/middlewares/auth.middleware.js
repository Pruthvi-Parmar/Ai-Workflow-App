import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]

    if(!token){
        return res.status(400).json({error:"Access Denied no token found!"})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded

        next()

    } catch (error) {
        res.status(400).json({error:"Invalid token"})
    }


}

export {
    authenticate
}
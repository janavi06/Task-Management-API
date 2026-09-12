const jwt = require("jsonwebtoken");

const authenticate = (request, response, next) => {

    const authHeader = request.headers.authorization;

   if (!authHeader || !authHeader.startsWith("Bearer ")){
    return response.status(401).json({
        error: "Authentication requried"
    })
   }

    const token = authHeader?.split(" ")[1];

    // if (!token){
    //     return response.status(401).json({
    //         error: "Authentication required"
    //     })
    // }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        request.user = decoded;
    } catch (error){
        return response.status(401).json({
            error: "Invalid or expired token"
        })
    }
    next();

    //jwt.verify it verifies if it sign using our key
    // and is token still valid or expired

}
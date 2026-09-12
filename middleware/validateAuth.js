 const validAuth = (request, response, next) => {

    const {name, email, password} = request.body;

    if (typeof name !== "string"){
        return response.status(400).json({
            error: "Invalid name"
        })
    }

    if (name.trim().length === 0){
        return response(400).json({
            error: "Invalid name"
        })
    }

    // email

    if (typeof email !== "string"){
        return response.status(400).json({
            error: "Invalid email"
        })
    }

    if (email.trim().length === 0){
        return response.status(400).json({
            error: "Invalid email"
        })
    }

    // password

    if (typeof password !== "string"){
        return response.status(400).json({
            error: "Invalid password"
        })
    }

    if (password.length < 8){
        return response.status(400).json({
            error: "Password must be atleast 8 characters"
        })
    }

    next();

 }
 module.exports = validateAuth;
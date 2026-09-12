

const validateLogin = (request, response, next) => {
    const {email, password} = request.body;

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

    if (typeof password !== "string"){
        return response.satus(400).json({
            error: "Invalid password"
        })
    }

    if (typeof password.length < 8){
        return response.status(400).json({
            error: "Invalid password"
        })
    }
    next();
}
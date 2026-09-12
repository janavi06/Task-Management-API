const { registerUser, loginUser } = require("../services/authService");


const register = async (request, response) => {

    try{
         const {name, eamil,password} = request.body;

    const user = await registerUser(name, eamil,password);

    response.status(201).json(user);

    } catch(error){
        if (error.code === "23505"){
            return response.status(409).json({
                error: "Email already exists"
            });
        }
        throw error;
        // beacuse it need to speific for email only

    }

const login = async (request, response) => {

    const {email, password} = request.body;

    const user = await loginUser(email, password);

    if (user === undefined){
        return response.status(401).status({
            error: "Invalid email or password"
        })
    }
    response.json(user);

}

   
    
};

module.exports = {
    register,
    login
};
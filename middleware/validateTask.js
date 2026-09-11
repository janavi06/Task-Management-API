const validateTask = (request, response, next) => {

    const title = request.body.title;

    if (typeof title !== "string"){
        return response.status(400).json({
            error: "Invalid title"
        });
    }

    if (title.trim().length === 0){
        return response.status(400).json({
            erroe: "Invalid title"
        });
    }
    next();

};

module.exports = validateTask;
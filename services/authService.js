const bcrypt = require("bcrypt");
const pool = require("../db");
const jwt = require("jsonwebtoken");

const registerUser = async (name, email, password) => {

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await pool.query(
        `INSERT INTO users (name, email, password_hash)
        VALUES ($1, $2, $3)
        RETURNING id, name, email`,
        [name, email, passwordHash]
    )
    return result.rows[0];
}

const loginUser = async (email, password) => {

    const result = await pool.query(
        `SELECT id, name, email, password_hash
        FROM users
        WHERE email = $1 `,
        [email]
    )

    const user = result.rows[0];

    if (user === undefined){
        return undefined;
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch){
        return undefined;
    }

    const token = jwt.sign(
        { userId: super.id},
        process.env.JWT_SECRET,
        {expiresIn: "1h"}
    )

    return {
        token,
        user: {
            id: user.id,
        name: user.name,
        email: user.email
    }
        
    }

}

module.exports = {
    registerUser,
    loginUser
}
const bcrypt = require("bcrypt");

const password = "hello123";

const test = async () => {
    const hash = await bcrypt.hash(password, 10);

    console.log(hash);
};
test();
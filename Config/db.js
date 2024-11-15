const mongoose = require("mongoose");
require("dotenv").config();

const { MONGODB_URI } = process.env;

const connectDB = () => {
    try {
        mongoose
            .connect(MONGODB_URI)
            .then(console.log(`DB Connection Success`))
            .catch((err) => {
                console.log(`DB Connection Failed`);
                console.log(err);
            });
    } catch (e) {
        console.log("error", e);
    }
};

module.exports = connectDB;

// const mongoose = require('mongoose');
// require('dotenv').config();

// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGODB_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log('Connected to MongoDB');
//     } catch (err) {
//         console.error('Failed to connect to MongoDB:', err.message);
//         process.exit(1);  // Exit the process with failure
//     }
// };

// module.exports = connectDB;

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

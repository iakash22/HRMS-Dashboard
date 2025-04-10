const { connect } = require('mongoose');

require('dotenv').config();

const dbConnect = () => {
    connect(process.env.DATABASE_URL, {})
        .then(() => {

            console.log("DATABASE CONNECTED!");
        })
        .catch((err) => {
            console.log("DATABASE CONNECTION FAILED", err);
            process.exit(1);
        });
}
module.exports = dbConnect;
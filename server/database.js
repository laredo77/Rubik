const mysql = require("mysql");
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    database: 'rubik_cube2',
    user: 'root',
    password: 'rubik23'
});

const connectToDatabase = () => {
    connection.connect(function (error) {
        if (error) {
            throw(error)
        } else {
            console.log('MySQL Database is connected Successfully');
        }
    });
}

module.exports = {
    connection,
    connectToDatabase
};

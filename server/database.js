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

const executeQuery = (query, params) => {
    return new Promise((resolve, reject) => {
        connection.query(query, params, (error, results) => {
            if (error) {
                console.error(error);
                console.log(`An error occurred while executing query: ${query}`);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

module.exports = {
    connection,
    connectToDatabase,
    executeQuery,
};

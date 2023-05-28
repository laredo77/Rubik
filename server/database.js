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

const executeTransaction = async (queries) => {
    try {
        await connection.beginTransaction(); // Begin the transaction
        for (const query of queries) {
            await executeQuery(query.query, query.params); // Execute each query
        }
        await connection.commit(); // Commit the transaction if all queries succeed
    } catch (error) {
        await connection.rollback(); // Rollback the transaction if an error occurs
        console.error('Transaction rolled back:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
};


module.exports = {
    connection,
    connectToDatabase,
    executeQuery,
    executeTransaction,
};

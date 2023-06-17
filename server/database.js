const mysql = require("mysql");

const dbConfig = {
    host: 'localhost',
    port: 3306,
    database: 'rubik_cube2',
    user: 'root',
    password: 'rubik23'
};

const connection = mysql.createConnection(dbConfig);

/**
 * Establishes a connection to the MySQL database.
 */
const connectToDatabase = () => {
    connection.connect((error) => {
        if (error) {
            throw error;
        } else {
            console.log('MySQL Database is connected successfully.');
        }
    });
};

/**
 * Executes a SQL query with parameters and returns a Promise with the results.
 *
 * @param {string} query - The SQL query to execute.
 * @param {any[]} params - The parameters to pass to the query.
 * @returns {Promise<any>} - A Promise that resolves to the query results.
 */
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

/**
 * Executes a transaction by executing multiple queries in a single transaction.
 * Rolls back the transaction if any error occurs during execution.
 *
 * @param {Array<{ query: string, params: any[] }>} queries - An array of query objects with `query` and `params` properties.
 * @throws {Error} - Throws an error if a rollback occurs.
 */
const executeTransaction = async (queries) => {
    try {
        await connection.beginTransaction(); // Begin the transaction
        for (const {query, params} of queries) {
            await executeQuery(query, params); // Execute each query
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

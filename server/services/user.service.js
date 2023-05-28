const database = require("../database");

// Function: addUser
// Description: Adds a user to the database if they don't already exist.
const addUser = async (user) => {
    return // should remove it

    // Check if the user already exists in the database
    const query1 = `SELECT * FROM user where user_email='${user.email}'`;
    database.connection.query(query1, (error, results) => {
        if (error) {
            console.error(error);
            console.log('An error occurred while checking the user');
        } else if (results.length > 0) {
            console.log('User already exists');
        } else {
            // If the user does not exist, insert them into the database
            const query2 = `INSERT INTO rubik_cube2.user (user_email) VALUES ('${user.email}')`;
            database.connection.query(query2, function (error, results, fields) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("User added successfully:", user);
                }
            });
        }
    });
};

// Function: buildLeaderboard
// Description: Retrieves user data from the database and builds a leaderboard.
const buildLeaderboard = async () => {
    // Send a query to retrieve the required data
    const query = `SELECT * FROM user`;

    // Create a Promise that wraps the database query
    const results = await new Promise((resolve, reject) => {
        database.connection.query(query, function (error, results, fields) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });

    // Return the formatted data
    return results.map(result => ({
        //todo fix picture rendering
        // User_Picture: Buffer.from(result.user_picture).toString("base64"),
        Email: result.user_email,
        Score: result.user_score
    }));
};

module.exports = {
    addUser,
    buildLeaderboard,
};

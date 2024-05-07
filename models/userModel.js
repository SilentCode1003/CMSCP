const mysql = require('mysql');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ojt',
  connectionLimit: 10 // Adjust according to your needs
});

// Define a function to execute SQL queries
function executeQuery(sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }
      connection.query(sql, values, (err, results) => {
        connection.release();
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  });
}

// Define a schema for your user data (similar to Mongoose)
const User = {
  getAllUsers: async () => {
    const sql = 'SELECT * FROM users';
    try {
      const users = await executeQuery(sql);
      return users;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = User;

const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  database: "ojt",
  user: "root",
  password: "2411",
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("Connected as id " + connection.threadId);
});

exports.Select = (sql, callback) => {
  try {
    connection.query(sql, (error, results, fields) => {
      if (error) return console.error(error.message);
      console.log(results);

      callback(null, results);
    });
  } catch (error) {
    callback(error, null);
  }
};
exports.Insert = (sql, todos, callback) => {
  try {
    connection.query(sql, todos, (err, results, fields) => {
      if (err) {
        console.error(err.message);
        return callback(err, null);
      }

      console.log(`Inserted Rows: ${results.affectedRows}`);
      callback(null, results);
    });
  } catch (error) {
    console.error(error.message);
    callback(error, null);
  }
};
exports.edit = (sql, data, callback) => {
  connection.query(sql, data, (error, results, fields) => {
    if (error) {
      console.error(error.message);
      return callback(error, null);
    }
    console.log('Rows affected:', results.affectedRows);
    callback(null, results);
  });
};
exports.deleteUser = (sql, data, callback) => {
  try {
    connection.query(sql, data, (error, results, fields) => {
      if (error) return console.error(error.message);
      console.log('Rows affected:', results.affectedRows);

      callback(null,results);
    });
  } catch (error) {
    callback(null, results);
    
  }
};
exports.editstatus = (sql, data, callback) => {
  connection.query(sql, data, (error, results, fields) => {
    if (error) {
      console.error(error.message);
      return callback(error, null);
    }
    console.log('Rows affected:', results.affectedRows);
    callback(null, results);
  });
};
exports.Query = (sql, values) => {
  return new Promise((resolve, reject) => {
      connection.query(sql, values, (error, results) => {
          if (error) {
              return reject(error);
          }
          resolve(results);
      });
  });
};

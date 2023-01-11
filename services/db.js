const mysql = require('mysql2/promise');
const config = require('../config/mysqlConfig');


async function Query(sql, params) {
  const connection = await mysql.createConnection(config.db);
  const [results] = await connection.execute(sql, params);
  connection.end();
  return results;
}

module.exports = {
  Query
}
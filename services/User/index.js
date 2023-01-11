const { v4: uuidv4 } = require('uuid');
const db = require('../db');
const helper = require('../../helpers/database');


  async function findUsername(username){
    const row = await db.Query(
      `SELECT * FROM users WHERE username = '${username}'`
    );
    const data = helper.emptyOrRows(row);
    return {
      data 
    }
  }
  async function findEmail(email){
    const row = await db.Query(
      `SELECT * FROM users WHERE email = '${email}'`
    );
    const data = helper.emptyOrRows(row);
    return {
      data 
    }
  }
  async function findPhone(phone){
    const row = await db.Query(
      `SELECT * FROM users WHERE phone = '${phone}'`
    );
    const data = helper.emptyOrRows(row);
    return {
      data 
    }
  }

  async function create(data = Object){
    const result = await db.Query(
      "INSERT INTO users (user_id, name, surname, email, phone, location, password) VALUES (?,?,?,?,?,?,?)", 
      [uuidv4(), data.name, data.surname, data.email, data.phone, data.location, data.password]
    );

    if (result.affectedRows) {
      return {
        "status" : "success"
      }
    } else {
      return {
        "status" : "fail"
      }
    }
  }

  module.exports = {
    findUsername,
    findEmail,
    findPhone,
    create
  }
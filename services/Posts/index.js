const db = require('../db');
const helper = require('../../helpers/database');

async function getAll(){
    const row = await db.Query(
      "SELECT `id`,`title`,`img`,`category`, `createdAt` FROM `news` WHERE isDraft = 0"
    );
    const data = helper.emptyOrRows(row);
  
    return {
      data 
    } 
  }

  async function get(id){
    const row = await db.Query(
      `SELECT * FROM news WHERE isDraft = 0 AND id = ${id}`
    );
    const data = helper.emptyOrRows(row);
    return {
      data 
    } 
  }
  
  
  module.exports = {
    getAll,
    get
  }
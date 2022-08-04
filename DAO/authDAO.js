"use strict";

const db = require("../db/db_info");

function login(client_id) {
  return new Promise((resolve, reject) => {
    const queryData = `SELECT count(*) as cnt FROM user u WHERE client_id ="${client_id}"`;
    db.query(queryData, (err, db_data) => {
      if (err) {
        reject("db err");
      } else {
        console.log(db_data[0].cnt);
        if (db_data[0].cnt == 0) {
          const resData = { "success": true, "jwt_token": null, "is_new": true }; // 여기처럼 😀

          resolve(resData);
        } else {
          const queryData = `SELECT jwt_token FROM user u WHERE client_id ="${client_id}"`;   
          db.query(queryData, (err, db_data) =>{
            if (err) {
              reject("db err");
            } else {
              const resData = { "success": true, "jwt_token": db_data[0].jwt_token, "is_new": false }; // 여기처럼 😀
              console.log(resData);
              resolve(resData); // client_id 를 가지고 user search 해서 tokenrㄱㅂ사 돌려줘
            }
          }); 
        }
      }
    });
  });
}

function register(client_id, name,jwtToken) {
  return new Promise((resolve, reject) => {
    const queryData = `INSERT INTO user(name, client_id, jwt_token) VALUE("${name}", "${client_id}", "${jwtToken}")`;
    db.query(queryData, (err, db_data) => {
      if (err) {
        console.log(err);
        reject("db err");
      } else {
        console.log(db_data);
        resolve(db_data);
      }
    });
  });
}
module.exports = {
  login,
  register,
};

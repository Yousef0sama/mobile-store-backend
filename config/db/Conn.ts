// imports
import dotenv from "dotenv";
import mysql from "mysql"

// .env config

dotenv.config();

// connection

export const createConnection = () => { 
  return mysql.createConnection({
  host : process.env.DB_HOST,
  user : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_DATABASE,
  port : Number(process.env.DB_PORT),
});
}
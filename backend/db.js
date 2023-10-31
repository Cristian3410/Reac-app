import mysql from "promise-mysql"
import dotenv from "dotenv"
dotenv.config()


const connection = mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
});


const getConnection = async () => connection;


export default getConnection
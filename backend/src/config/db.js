import mysql from "mysql2/promise";

const dbConnection = await mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  port: parseInt(process.env.DB_PORT || "3306"),
  password: process.env.DB_PWD || "",
  database: process.env.DB_NAME || "db_mapa",
});

export default dbConnection;

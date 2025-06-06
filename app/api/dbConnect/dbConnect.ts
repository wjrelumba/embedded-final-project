// app/api/dbConnect/dbConnect.ts
import mysql2 from 'mysql2/promise';

const pool = mysql2.createPool({
  user: 'root',
  host: 'localhost',
  database: 'embedded_final_project',
  waitForConnections: true,
  connectionLimit: 10, // adjust as needed
  queueLimit: 0,
});

export default pool;
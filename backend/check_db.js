import pool from './src/db.js';

async function check() {
  const [rows] = await pool.query("SHOW TABLES");
  console.log("Tables:", rows);
  
  const [cols] = await pool.query("SHOW COLUMNS FROM gallery");
  console.log("Gallery columns:", cols);
  
  process.exit(0);
}
check();

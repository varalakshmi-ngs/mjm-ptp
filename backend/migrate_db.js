import pool from './src/db.js';

async function migrate() {
  try {
    console.log("Starting DB migration...");
    
    // Create albums table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS albums (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log("Created albums table");

    // Create album_images table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS album_images (
        id INT AUTO_INCREMENT PRIMARY KEY,
        album_id INT NOT NULL,
        image_data LONGBLOB NOT NULL,
        image_name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (album_id) REFERENCES albums(id) ON DELETE CASCADE
      )
    `);
    console.log("Created album_images table");

    // Check if migration has already been run
    const [existingAlbums] = await pool.query('SELECT COUNT(*) as count FROM albums');
    if (existingAlbums[0].count === 0) {
      // Check if gallery exists
      const [tables] = await pool.query("SHOW TABLES LIKE 'gallery'");
      if (tables.length > 0) {
        console.log("Migrating data from gallery to albums and album_images...");
        
        // Insert into albums
        await pool.query(`
          INSERT INTO albums (id, title, created_at)
          SELECT id, title, created_at FROM gallery
        `);
        
        // Insert into album_images
        await pool.query(`
          INSERT INTO album_images (album_id, image_data, image_name, created_at)
          SELECT id, image_data, image_name, created_at FROM gallery
        `);
        
        console.log("Data migrated successfully");
      }
    } else {
      console.log("Data already migrated.");
    }

    console.log("Migration complete!");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    process.exit(0);
  }
}

migrate();

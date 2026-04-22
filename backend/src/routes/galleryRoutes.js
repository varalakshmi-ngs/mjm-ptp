import express from 'express';
import pool from '../db.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Get all albums
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT a.id, a.title, a.created_at, 
      (SELECT id FROM album_images WHERE album_id = a.id ORDER BY id ASC LIMIT 1) as cover_image_id 
      FROM albums a ORDER BY a.created_at DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching albums:', error);
    res.status(500).json({ message: 'Error fetching albums' });
  }
});

// Get album images
router.get('/:id/images', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, image_name, created_at FROM album_images WHERE album_id = ? ORDER BY id ASC', [req.params.id]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching album images:', error);
    res.status(500).json({ message: 'Error fetching images' });
  }
});

// Get single image
router.get('/image/:imageId', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT image_data, image_name FROM album_images WHERE id = ?', [req.params.imageId]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Image not found' });
    }

    const image = rows[0];
    const ext = path.extname(image.image_name).toLowerCase();
    let contentType = 'image/jpeg';
    if (ext === '.png') contentType = 'image/png';
    else if (ext === '.gif') contentType = 'image/gif';
    else if (ext === '.webp') contentType = 'image/webp';
    else if (ext === '.svg') contentType = 'image/svg+xml';
    
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `inline; filename="${image.image_name}"`);
    res.send(image.image_data);
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({ message: 'Error fetching image' });
  }
});

// Add new album
router.post('/', upload.array('images', 50), async (req, res) => {
  try {
    const { title } = req.body;
    
    if (!title || !req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'Title and at least one image are required' });
    }

    const [result] = await pool.query(
      'INSERT INTO albums (title) VALUES (?)',
      [title]
    );
    const albumId = result.insertId;

    for (const file of req.files) {
      await pool.query(
        'INSERT INTO album_images (album_id, image_data, image_name) VALUES (?, ?, ?)',
        [albumId, file.buffer, file.originalname]
      );
    }
    
    res.status(201).json({ message: 'Album added successfully', albumId });
  } catch (error) {
    console.error('Error adding album:', error);
    res.status(500).json({ message: 'Error adding album' });
  }
});

// Update album title
router.put('/:id', async (req, res) => {
  try {
    const { title } = req.body;
    
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const [result] = await pool.query(
      'UPDATE albums SET title = ? WHERE id = ?',
      [title, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Album not found' });
    }
    
    res.json({ message: 'Album updated successfully' });
  } catch (error) {
    console.error('Error updating album:', error);
    res.status(500).json({ message: 'Error updating album' });
  }
});

// Delete album
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM albums WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Album not found' });
    }
    
    res.json({ message: 'Album deleted successfully' });
  } catch (error) {
    console.error('Error deleting album:', error);
    res.status(500).json({ message: 'Error deleting album' });
  }
});

// Delete single image
router.delete('/image/:imageId', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM album_images WHERE id = ?', [req.params.imageId]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Image not found' });
    }
    
    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ message: 'Error deleting image' });
  }
});

// For backward compatibility: Get single gallery image by old endpoint route
router.get('/:id', async (req, res) => {
  try {
    // If we migrated, the old image ID might not be identical unless we kept it in a map, 
    // but the DB migration copied id -> id for album_images, so we can just look up album_images.
    const [rows] = await pool.query('SELECT image_data, image_name FROM album_images WHERE id = ?', [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Image not found' });
    }

    const image = rows[0];
    const ext = path.extname(image.image_name).toLowerCase();
    let contentType = 'image/jpeg';
    if (ext === '.png') contentType = 'image/png';
    else if (ext === '.gif') contentType = 'image/gif';
    else if (ext === '.webp') contentType = 'image/webp';
    else if (ext === '.svg') contentType = 'image/svg+xml';
    
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `inline; filename="${image.image_name}"`);
    res.send(image.image_data);
  } catch (error) {
    console.error('Error fetching gallery image:', error);
    res.status(500).json({ message: 'Error fetching image' });
  }
});

export default router;

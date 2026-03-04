import express from 'express';
import pool from './db.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Helper to safely convert base64 to Buffer
const getBuffer = (data) => {
  if (!data || typeof data !== 'string' || !data.includes(',')) return null;
  try {
    return Buffer.from(data.split(',')[1], 'base64');
  } catch (err) {
    console.error('Base64 conversion error:', err);
    return null;
  }
};

// Registration endpoint
router.post(
  '/',
  [
  body('fullName').isLength({ min: 1 }).trim(),
  body('fatherName').isLength({ min: 1 }).trim(),
  body('dateOfBirth').isISO8601(),
  body('gender').isIn(['Male', 'Female', 'Other']),
  body('mobile').isLength({ min: 10, max: 10 }).isNumeric(),
  body('email').isEmail(),
  body('qualification').notEmpty(),
  body('specialization').notEmpty(),
  body('yearOfPassing').isInt({ min: 1990, max: 2026 }),
  body('percentage').notEmpty(),
  body('applyingFor').notEmpty(),
  body('experience').isIn(['Fresher', 'Experienced']),
  body('skills').notEmpty(),
  body('preferredLocation').notEmpty(),
  body('declaration').isBoolean()   // ✅ fixed
],
  async (req, res) => {
    console.log('Incoming registration payload:', req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      fullName,
      fatherName,
      dateOfBirth,
      gender,
      mobile,
      email,
      aadhaar,
      qualification,
      specialization,
      yearOfPassing,
      percentage,
      applyingFor,
      experience,
      skills,
      preferredLocation,
      resumeData,
      photoData,
    } = req.body;

    try {
      // Check if email or mobile already exists
      const [existing] = await pool.query(
        'SELECT id FROM candidates WHERE email = ? OR mobile = ?',
        [email, mobile]
      );

      if (existing.length > 0) {
        console.log('Duplicate email or mobile:', email, mobile);
        return res.status(409).json({
          message: 'Email or mobile already registered',
        });
      }

      // Convert files safely
      const resumeBuffer = getBuffer(resumeData);
      const photoBuffer = getBuffer(photoData);
      // Govt ID Proof removed

      // Insert candidate
      await pool.query(
        `INSERT INTO candidates (
          full_name, father_name, date_of_birth, gender, mobile, email, aadhaar,
          qualification, specialization, year_of_passing, percentage, applying_for,
          experience, skills, preferred_location, resume, photo
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          fullName,
          fatherName,
          dateOfBirth,
          gender,
          mobile,
          email,
          aadhaar || null,
          qualification,
          specialization,
          yearOfPassing,
          percentage,
          applyingFor,
          experience,
          skills,
          preferredLocation,
          resumeBuffer,
          photoBuffer,
        ]
      );

      console.log('Registration successful for:', email);
      res.status(201).json({ message: 'Registration successful' });
    } catch (err) {
      console.error('Registration DB error:', err.sqlMessage || err);
      res.status(500).json({
        message: 'Server error',
        error: err.message || 'Unknown error',
      });
    }
  }
);

// Admin: Get all candidates
router.get('/candidates', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT 
         id, full_name, father_name, date_of_birth, gender, mobile, email,
         aadhaar, qualification, specialization, year_of_passing, percentage,
         applying_for, experience, skills, preferred_location, created_at
       FROM candidates
       ORDER BY created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error('Get candidates error:', err.sqlMessage || err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;

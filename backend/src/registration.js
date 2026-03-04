import express from 'express';
import pool from './db.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Helper to safely convert base64 to Buffer
const getBuffer = (data) => {
  if (!data || !data.includes(',')) return null;
  return Buffer.from(data.split(',')[1], 'base64');
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
    body('resumeData').notEmpty(),
    body('photoData').notEmpty(),
    body('govtIdProofData').notEmpty(),
    body('declaration').isBoolean().equals('true'),
  ],
  async (req, res) => {
    console.log('Incoming registration data:', req.body); // <-- Debugging log

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
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
      govtIdProofData,
    } = req.body;

    try {
      // Check if email or mobile already exists
      const [existing] = await pool.query(
        'SELECT id FROM candidates WHERE email = ? OR mobile = ?',
        [email, mobile]
      );
      if (existing.length > 0) {
        return res
          .status(409)
          .json({ message: 'Email or mobile already registered' });
      }

      // Insert into DB safely
      await pool.query(
        `INSERT INTO candidates (
          full_name, father_name, date_of_birth, gender, mobile, email, aadhaar,
          qualification, specialization, year_of_passing, percentage, applying_for,
          experience, skills, preferred_location, resume, photo, govt_id_proof
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
          getBuffer(resumeData),
          getBuffer(photoData),
          getBuffer(govtIdProofData),
        ]
      );

      res.status(201).json({ message: 'Registration successful' });
    } catch (err) {
      console.error('Registration error:', err); // <-- Logs actual DB errors
      res.status(500).json({ message: 'Server error' });
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
         applying_for, experience, skills, preferred_location, created_at, govt_id_proof
       FROM candidates
       ORDER BY created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error('Get candidates error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

// const apiKey = process.env.TWO_FACTOR_API_KEY;
const apiKey ="227269a4-23f9-11ef-8b60-0200cd936042";

// Send OTP
router.post('/send-otp', async (req, res) => {
  const { mobile } = req.body;
  if (!mobile) return res.status(400).json({ success: false, message: 'Mobile number required' });

  try {
    const response = await fetch(`https://2factor.in/API/V1/${apiKey}/SMS/91${mobile}/AUTOGEN`);
    const data = await response.json();

    if (data.Status === 'Success') {
      return res.json({ success: true, sessionId: data.Details }); // Important: return sessionId
    } else {
      return res.status(400).json({ success: false, message: data.Details });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  const { mobile, otp, sessionId } = req.body;
  if (!mobile || !otp || !sessionId) {
    return res.status(400).json({ success: false, message: 'Mobile, OTP, and sessionId are required' });
  }

  try {
    const response = await fetch(`https://2factor.in/API/V1/${apiKey}/SMS/VERIFY/${sessionId}/${otp}`);
    const data = await response.json();

    if (data.Status === 'Success') return res.json({ success: true });
    else return res.status(400).json({ success: false, message: data.Details });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;

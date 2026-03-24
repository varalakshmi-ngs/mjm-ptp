import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import registrationRouter from './registration.js';
import otpRoutes from './routes/otpRoutes.js';

dotenv.config();

const app = express();

app.disable('x-powered-by');
app.use(helmet());

const allowedOrigins = [
  "http://localhost:5173",
  "https://jobmela.sdvvl.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    }
  })
);

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/registration', registrationRouter);
app.use('/api/otp', otpRoutes);

app.get('/', (req, res) => {
  res.send('JobMela Backend Running');
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
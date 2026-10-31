import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import entryRoutes from './routes/entryRoutes.js';
import judgeRoutes from './routes/judgeRoutes.js';
import weeklyRoutes from './routes/weeklyRoutes.js';

const isTestEnv = process.env.NODE_ENV === 'test';
if (!isTestEnv) {
  dotenv.config();
}

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// CORS configuration
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:5173',
  'http://localhost:5173',
  'http://127.0.0.1:5173'
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || origin.startsWith('http://localhost:')) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Healthcheck & metadata
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    app: 'LIFE JUDGE AI Backend',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    geminiKeyConfigured: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== '')
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/entries', entryRoutes);
app.use('/api/judge', judgeRoutes);
app.use('/api/weekly-review', weeklyRoutes);

// 404 Fallback for unknown API routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint '${req.originalUrl}' not found.`
  });
});

// Error handling middleware
app.use(errorHandler);

let server;
if (process.env.NODE_ENV !== 'test') {
  server = app.listen(PORT, () => {
    console.log(`[LIFE JUDGE AI] Server is running on port ${PORT}`);
    console.log(`[LIFE JUDGE AI] Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

process.on('unhandledRejection', (err) => {
  console.error(`[Unhandled Rejection Error]: ${err.message}`);
});

export default app;

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { getRepository } from './github';
import { connectRedis, cacheResult, getCachedResult } from './redis';
import { analyzeCode } from './analyze';

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// Define the /repo/:owner/:repo route
app.get('/repo/:owner/:repo', async (req, res) => {
  const { owner, repo } = req.params;
  const data = await getRepository(owner, repo);
  if (data) {
    res.json(data);
  } else {
    res.status(404).send('Repository not found');
  }
});

// Connect to Redis
connectRedis();

// Define the /analyze route
app.post('/analyze', async (req, res) => {
  const { code } = req.body;
  const cacheKey = `analysis:${code}`;
  const cachedAnalysis = await getCachedResult(cacheKey);

  if (cachedAnalysis) {
    return res.json({ analysis: cachedAnalysis });
  }

  const analysis = await analyzeCode(code);
  if (analysis) {
    await cacheResult(cacheKey, analysis);
    res.json({ analysis });
  } else {
    res.status(500).send('Error analyzing code');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

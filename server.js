import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Use the PORT environment variable provided by the system, defaulting to 8080
const PORT = process.env.PORT || 8080;
// Listen on 0.0.0.0 (instead of localhost) to be accessible externally
const HOST = '0.0.0.0';

// Serve static assets from the current directory
app.use(express.static(__dirname));

// Handle SPA (Single Page Application) routing
// This ensures that all requests fall back to index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});
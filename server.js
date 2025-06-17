const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Import backend route handlers
const adminRoutes = require('./routes/adminRoutes');
const botRoutes = require('./routes/botRoutes');
const moduleRoutes = require('./routes/moduleRoutes');

// Import direct backend functions
const submitReflection = require('./submitReflection');
const submitUpgrade = require('./submitUpgrade');

// Middleware
app.use(express.json()); // Allow JSON request handling
app.use(express.static(path.join(__dirname, 'landing_page'))); // Serve static landing page

// API Routes
app.use('/dashboard', adminRoutes);
app.use('/activate-bot', botRoutes);
app.use('/module-catalog', moduleRoutes);

// Custom API Endpoints
app.post('/api/submit-reflection', submitReflection);
app.post('/api/submit-upgrade', submitUpgrade);

// Fallback for unknown paths
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'landing_page/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Interlink Grid AI Full System running on port ${PORT}`);
});

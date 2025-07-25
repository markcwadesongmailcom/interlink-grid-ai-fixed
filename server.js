const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const submitGridChat = require('./submitGridChat');

// Import backend route handlers
const adminRoutes = require('./routes/adminRoutes');
const botRoutes = require('./routes/botRoutes');
const moduleRoutes = require('./routes/moduleRoutes');

// Import direct backend functions
const submitReflection = require('./submitReflection');
const submitUpgrade = require('./submitUpgrade');
const submitSubscription = require('./submitSubscription'); // ✅ NEW
const submitGatewayAccess = require('./submitGatewayAccess');

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
app.post('/api/submit-subscription', submitSubscription); // ✅ NEW
app.post('/api/enter-grid', submitGatewayAccess);
app.post('/api/grid-chat', submitGridChat);

// Fallback for unknown paths
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'landing_page/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Interlink Grid AI Full System running on port ${PORT}`);
});

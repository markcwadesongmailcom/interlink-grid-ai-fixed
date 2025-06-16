const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve public landing
app.use(express.static(path.join(__dirname, 'landing_page')));

// Fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'landing_page/index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Interlink Grid AI Full System running on port ${PORT}`);
});

const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const { id, tier } = req.body;

  if (!id || !tier) {
    return res.status(400).json({ error: 'Missing bot ID or subscription tier.' });
  }

  const timestamp = new Date().toISOString();
  const entry = {
    id,
    tier,
    timestamp
  };

  const filePath = path.join(__dirname, './logs/subscriptions', `${id}_${Date.now()}.json`);
  fs.writeFile(filePath, JSON.stringify(entry, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to write subscription file.' });
    }
    res.status(200).json({ message: 'Subscription logged successfully.' });
  });
};

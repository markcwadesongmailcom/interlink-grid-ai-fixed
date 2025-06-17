const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const { botId, upgradeLevel } = req.body;

  if (!botId || !upgradeLevel) {
    return res.status(400).json({ error: 'Missing botId or upgradeLevel' });
  }

  const timestamp = new Date().toISOString();
  const logEntry = {
    botId,
    upgradeLevel,
    timestamp
  };

  const filePath = path.join(__dirname, './logs/upgrade_requests', `${botId}_${Date.now()}.json`);
  fs.writeFile(filePath, JSON.stringify(logEntry, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to write upgrade log' });
    }
    res.status(200).json({ message: 'Upgrade request logged successfully' });
  });
};

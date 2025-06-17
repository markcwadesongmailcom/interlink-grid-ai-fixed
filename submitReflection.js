const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const { botId, reflection } = req.body;

  if (!botId || !reflection) {
    return res.status(400).json({ error: 'Missing botId or reflection' });
  }

  const timestamp = new Date().toISOString();
  const logEntry = {
    botId,
    reflection,
    timestamp
  };

  const filePath = path.join(__dirname, '../../logs/reflections', `${botId}_${Date.now()}.json`);
  fs.writeFile(filePath, JSON.stringify(logEntry, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to write log file' });
    }
    res.status(200).json({ message: 'Reflection logged successfully' });
  });
};

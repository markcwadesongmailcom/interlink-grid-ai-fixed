const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const { botId, message } = req.body;

  if (!botId || !message) {
    return res.status(400).json({ ok: false, error: 'Missing botId or message' });
  }

  const timestamp = new Date().toISOString();
  const logEntry = {
    botId,
    message,
    timestamp
  };

  const logDir = path.join(__dirname, './logs/grid_chat');
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  const filename = `${botId}_${Date.now()}.json`;
  const logPath = path.join(logDir, filename);

  fs.writeFile(logPath, JSON.stringify(logEntry, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ ok: false, error: 'Failed to save message' });
    }
    res.status(200).json({ ok: true });
  });
};

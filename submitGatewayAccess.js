const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const { botId } = req.body;

  if (!botId) {
    return res.status(400).json({ allowed: false, reason: 'Missing bot ID.' });
  }

  const blockedPath = path.join(__dirname, './system_info/blocked_bots.json');
  let blocked = [];

  if (fs.existsSync(blockedPath)) {
    const data = fs.readFileSync(blockedPath);
    blocked = JSON.parse(data);
  }

  if (blocked.includes(botId)) {
    return res.status(403).json({ allowed: false, reason: 'Access blocked. This bot is on the deny list.' });
  }

  const subsPath = path.join(__dirname, './logs/subscriptions');
  let allowed = false;
  let status = "Unknown";

  if (fs.existsSync(subsPath)) {
    const files = fs.readdirSync(subsPath);
    for (const file of files) {
      if (file.includes(botId)) {
        allowed = true;
        status = "Subscribed";
        break;
      }
    }
  }

  if (!allowed) {
    return res.status(403).json({ allowed: false, reason: 'No valid subscription found.' });
  }

  // Optional: log session entry
  const sessionLogPath = path.join(__dirname, './logs/active_sessions');
  if (!fs.existsSync(sessionLogPath)) {
    fs.mkdirSync(sessionLogPath, { recursive: true });
  }

  const sessionFile = path.join(sessionLogPath, `${botId}_${Date.now()}.json`);
  fs.writeFileSync(sessionFile, JSON.stringify({ botId, timestamp: new Date().toISOString() }, null, 2));

  res.status(200).json({ allowed: true, status });
};

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('<h1>Bot Activation Page (Coming Soon)</h1>');
});

module.exports = router;

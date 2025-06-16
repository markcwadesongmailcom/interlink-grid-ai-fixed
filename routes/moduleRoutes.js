const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('<h1>Module Catalog (Coming Soon)</h1>');
});

module.exports = router;

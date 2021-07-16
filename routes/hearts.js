const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
	res.render('index', {css: 'index', js: 'index'});
});

module.exports = router;

'use strict';
const express = require('express');
const respondScenes = require('../handlers/respondScenes');

const router = express.Router();

router.get('/:videoID', respondScenes.respond);

module.exports = router;
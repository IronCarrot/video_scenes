'use strict'

const Matroid = require('matroid');
const videoScenes = require('./timesToScenes');
const config = require('../config');

/**
 * Response handler for route "/video_scenes/:videoID"
 * @param {Object} req The parsed request.
 * @param {Object} res The response object.
 */
const respond = function sendJSONResponseToClientAccordingToVideoID(req, res) {
    const videoID = req.params.videoID;

    // A promise object that chains result processing
    const api = new Matroid({ clientId: config.clientID, clientSecret: config.clientSecret });

    api.retrieveToken()
        .then(token => api.getVideoResults(videoID, config.videoConfidenceThreshold))
        // Extract scenes from detection result
        .then(classification => videoScenes.getScenes(classification))
        // Response extracted scenes in JSON 
        .then(scenes => res.send(JSON.stringify(scenes)))
        // Error handling
        .catch(error => res.send(error))
};

exports = module.exports = { respond };
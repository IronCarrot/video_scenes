const clientID = 'avYckU96ZSkzSMPX';
const clientSecret = '76QBpeZvBVbfqMFSKaWoCG5o1VTlOEfP';
// Threshold for filter video detection results
const videoConfidenceThreshold = 0.7;
// Parameters for ./handler/timesToScene.timestampsToScenes
const minDuration = 2;
const maxTimeLapse = 20;

exports = module.exports = { clientID, clientSecret, videoConfidenceThreshold, minDuration, maxTimeLapse};
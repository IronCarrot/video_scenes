'use strict'
const config = require('../config');

/**
 * Wrapper function of the whole module.
 * Extract scenes from video detection result.
 * @param {Object} result The parsed video detection result.
 * @return {Object[]} The array of objects in form of {"person": "name", "scenes": ["a-b", "b-c"]}.
 */
const getScenes = function getScenesFromVideoClassificationResult(result) {
    if (result === null || result === undefined || Object.keys(result).length == 0) {
        return [];
    }

    // Handle error message, pass error directly
    if ('message' in result) {
        return result;
    }

    // Handle video detection result
    const labelTimeDict = collectTimestamps(result);
    const peopleAndScenes = labelTimeToIntervals(labelTimeDict, result);

    //return peopleAndScenes;
    return peopleAndScenes;
};

/**
 * Collect timestamps for each label, each label for a person
 * @param {Object} result The parsed video detection result.
 * @return {Object} The object contains key-value pair in form of {label: [x, y, z]}. 
 */
const collectTimestamps = function collectTimestampsForEachLabel(result) {
    if (result === null || result === undefined || Object.keys(result).length == 0) {
        return {};
    }

    const labelTimeDict = {};

    Object.keys(result.label_dict).map(key => {
        labelTimeDict[key] = [];
    });

    Object.keys(result.detections).map(detection => {
        result.detections[detection].map(location => {
            // FIXEME: Retrive most condifent key, potentially no need as keys are listed from most confident, just an alternative way for next line
            //const label = Object.keys(location.labels).reduce((a, b) => { location.labels[a] > location.labels[b] ? a : b });
            const label = Object.keys(location.labels)[0];
            labelTimeDict[label].push(Number(detection));
        })
    });

    Object.values(labelTimeDict).forEach(value => {
        value.sort(function (a, b) {
            return a - b;
        });
    });

    return labelTimeDict;
};


/**
 * Convert label to timestamp to person and scenes.
 * @param {Object} labelTimeDict The object contains key-value pair in form of {label: [x, y, z]}.
 * @return {Object[]} The array of objects in form of {"person": "name", "scenes": ["x-y"]}. 
 */
const labelTimeToIntervals = function convertLabelTimestampDictionaryToNameIntervalsDictionary(labelTimeDict, result) {
    if (labelTimeDict === null || labelTimeDict === undefined || Object.keys(labelTimeDict).length == 0) {
        return [];
    }

    if (result === null || result === undefined || Object.keys(result).length == 0) {

        return [];
    }

    const peopleAndScenes = [];

    Object.entries(labelTimeDict).map(entry => {
        const nameAndScenes = {
            person: result.label_dict[entry[0]],
            scencs: timestampsToScenes(entry[1])
        };
        peopleAndScenes.push(nameAndScenes);
    });

    return peopleAndScenes;
};


/**
 * Convert timestamps to scenes.
 * @param {number[]} timestamps The array of timestamps.
 * @return {Object[]} The array scenes, each entry in form of "x-y". 
 */
const timestampsToScenes = function convertTimestampsToScenes(timestamps) {
    if (timestamps === null || timestamps === undefined || timestamps.length == 0) {
        return []
    }

    // Max scene duration
    const minDuration = config.minDuration;
    const maxTimeLapse = config.maxTimeLapse;

    let head = timestamps[0];
    const intervals = [[]];

    timestamps.map(timestamp => {
        if (timestamp - head < maxTimeLapse) {
            intervals[intervals.length - 1].push(timestamp);
        } else {
            intervals.push([timestamp]);
        }
        head = timestamp;
    });

    const result = [];

    intervals.map(interval => {
        if (interval.length == 1 || interval[interval.length - 1] - interval[0] <= minDuration) {
            result.push(String(interval[0]) + '-' + String(interval[0] + minDuration));
        } else {
            result.push(String(interval[0]) + '-' + String(interval[interval.length - 1]));
        }
    });

    return result;
};

module.exports = { getScenes, collectTimestamps, labelTimeToIntervals, timestampsToScenes };
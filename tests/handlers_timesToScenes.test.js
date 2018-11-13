const expect = require('chai').expect;
const timesToScenes = require('../handlers/timesToScenes');
const config = require('../config');

describe('Suite - timestampsToScenes', function () {
    it('Test 1 - Null input', function () {
        const input = null;
        const actual = timesToScenes.timestampsToScenes(input);

        const expected = [];

        expect(actual).to.deep.equal(expected);
    });

    it('Test 2 - Undefined input', function () {
        const input = undefined;
        const actual = timesToScenes.timestampsToScenes(input);

        const expected = [];

        expect(actual).to.deep.equal(expected);
    });

    it('Test 3 - Empty array', function () {
        const input = [];
        const actual = timesToScenes.timestampsToScenes(input);

        const expected = [];

        expect(actual).to.deep.equal(expected);
    });

    it('Test 4 - 1 element array', function () {
        const input = [3];
        const actual = timesToScenes.timestampsToScenes(input);

        const expected = [String(3) + '-' + String(3 + config.minDuration)];

        expect(actual).to.deep.equal(expected);
    });

    it('Test 5 - 1 element array', function () {
        const input = [3];
        const actual = timesToScenes.timestampsToScenes(input);

        const expected = [String(3) + '-' + String(3 + config.minDuration)];

        expect(actual).to.deep.equal(expected);
    });

    it('Test 6 - 2 element input', function () {
        const input = [3, 5];
        const actual = timesToScenes.timestampsToScenes(input);

        const expected = ['3-5'];

        expect(actual).to.deep.equal(expected);
    });

    it('Test 7 - real input #1', function () {
        const input = [41, 43.5, 49, 51, 53.5, 56, 56.5, 59.5, 60, 61, 64, 65, 71.5, 72, 82, 83.5, 84, 84.5, 89, 89.5, 90, 90.5, 91, 92, 93, 105.5, 110.5, 113.5, 114.5, 115, 116, 116.5, 117, 117.5, 118.5, 120.5, 121, 128.5, 129, 199.5, 371, 372, 405.5, 422.5, 435.5, 436, 448.5, 454.5, 459.5, 461, 464.5, 465, 532.5, 649.5, 655.5, 665, 665.5, 666, 666.5, 667, 667.5, 674.5, 675, 676, 683, 683.5, 684.5, 688, 688.5, 736.5, 766, 770.5, 797];
        const actual = timesToScenes.timestampsToScenes(input);

        const expected = ['41-129', '199.5-201.5', '371-373', '405.5-465', '532.5-534.5', '649.5-688.5', '736.5-738.5', '766-770.5', '797-799'];

        expect(actual).to.deep.equal(expected);
    });

    it('Test 8 - real input #2', function () {
        const input = [39, 40, 40.5, 41, 42.5, 48, 48.5, 49, 49.5, 50, 50.5, 51, 51.5, 52, 52.5, 54.5, 56, 57, 57.5, 58, 58.5, 59, 59.5, 60, 60.5, 61, 62, 62.5, 63, 63.5, 64, 64.5, 65, 65.5, 66, 66.5, 67, 71, 71.5, 73.5, 74, 74.5, 76.5, 77, 77.5, 78, 79, 79.5, 80, 80.5, 81, 81.5, 82, 82.5, 83, 84, 84.5, 85, 85.5, 89, 89.5, 90, 90.5, 91.5, 92, 92.5, 93, 93.5, 94, 94.5, 95, 95.5, 96, 96.5, 97, 97.5, 98, 98.5, 99, 99.5, 101, 101.5, 102, 103.5, 104.5, 106, 109.5, 110, 110.5, 111, 111.5, 112, 112.5, 113, 114.5, 115, 116, 116.5, 117, 117.5, 118, 118.5, 119, 119.5, 120, 125.5, 126, 127, 129.5, 130, 130.5, 131, 131.5, 132, 132.5, 133, 133.5, 134, 134.5, 135, 135.5, 136, 136.5, 137, 137.5, 138, 138.5, 176, 176.5, 177, 186, 186.5, 188.5, 189.5, 218.5, 220.5, 237, 248.5, 249.5, 250, 250.5, 369, 369.5, 370, 370.5, 373.5, 374, 404.5, 406, 415, 420.5, 429.5, 433.5, 435, 436, 438.5, 439, 439.5, 440, 440.5, 441, 441.5, 442, 442.5, 448, 457.5, 458, 462.5, 463, 463.5, 464, 465, 465.5, 706.5, 707, 707.5, 708.5, 711.5, 712, 712.5, 713, 713.5, 714, 714.5, 759.5, 760.5, 768, 809.5, 810, 810.5, 811, 811.5, 812, 812.5, 881, 899.5, 900, 900.5];
        const actual = timesToScenes.timestampsToScenes(input);

        const expected = ['39-138.5', '176-189.5', '218.5-250.5', '369-374', '404.5-465.5', '706.5-714.5', '759.5-768', '809.5-812.5', '881-900.5'];

        expect(actual).to.deep.equal(expected);
    });


});

describe('Suite - labelTimeToIntervals', function () {
    const detectionResult = {
        "download_progress": 100,
        "classification_progress": 100,
        "status": "Classification complete",
        "label_dict": {
            "0": "Adam Brody",
            "1": "Angelina Jolie",
            "2": "Brad Pitt",
            "3": "Kerry Washington",
            "4": "Michelle Monaghan",
            "5": "Vince Vaughn"
        },
        "state": "success",
        "detections": {
            "5356": [
                {
                    "labels": {
                        "5": 0.9986
                    },
                    "bbox": {
                        "width": 0.2365,
                        "top": 0,
                        "height": 0.8039,
                        "left": 0.2436
                    }
                }
            ],
            "5360": [
                {
                    "labels": {
                        "5": 0.9982
                    },
                    "bbox": {
                        "width": 0.1312,
                        "top": 0.1713,
                        "height": 0.4392,
                        "left": 0.3138
                    }
                }
            ],
            "5361": [
                {
                    "labels": {
                        "5": 0.9984
                    },
                    "bbox": {
                        "width": 0.1335,
                        "top": 0.1796,
                        "height": 0.4254,
                        "left": 0.3103
                    }
                }
            ],
            "5458": [
                {
                    "labels": {
                        "2": 0.9981
                    },
                    "bbox": {
                        "width": 0.2202,
                        "top": 0.1243,
                        "height": 0.71,
                        "left": 0.5117
                    }
                }
            ],
            "1026.5": [
                {
                    "labels": {
                        "2": 0.9981
                    },
                    "bbox": {
                        "width": 0.0819,
                        "top": 0.1575,
                        "height": 0.2624,
                        "left": 0.4251
                    }
                }
            ],
            "5383.5": [
                {
                    "labels": {
                        "5": 0.9987
                    },
                    "bbox": {
                        "width": 0.137,
                        "top": 0.1326,
                        "height": 0.442,
                        "left": 0.2717
                    }
                }
            ]
        },
        "video_id": "5a3ec65b37939b0013123535",
        "detection_fps": 2
    };
    const timestampByLabel = {
        "0": [],
        "1": [],
        "2": [1026.5, 5458],
        "3": [],
        "4": [],
        "5": [5356, 5360, 5361, 5383.5]
    };
    it('Test 1 - Null input_1', function () {
        const input = null;
        const actual = timesToScenes.labelTimeToIntervals(input, detectionResult);

        const expected = [];

        expect(actual).to.deep.equal(expected);
    });

    it('Test 2 - Undefined input_1', function () {
        const input = undefined;
        const actual = timesToScenes.labelTimeToIntervals(input, detectionResult);

        const expected = [];

        expect(actual).to.deep.equal(expected);
    });

    it('Test 3 - Empty array input_1', function () {
        const input = [];
        const actual = timesToScenes.labelTimeToIntervals(input, detectionResult);

        const expected = [];

        expect(actual).to.deep.equal(expected);
    });

    it('Test 4 - Null input_2', function () {
        const input = null;
        const actual = timesToScenes.labelTimeToIntervals(timestampByLabel, input);

        const expected = [];

        expect(actual).to.deep.equal(expected);
    });

    it('Test 5 - Undefined input_2', function () {
        const input = undefined;
        const actual = timesToScenes.labelTimeToIntervals(timestampByLabel, input);

        const expected = [];

        expect(actual).to.deep.equal(expected);
    });

    it('Test 6 - Empty array input_2', function () {
        const input = [];
        const actual = timesToScenes.labelTimeToIntervals(timestampByLabel, input);

        const expected = [];

        expect(actual).to.deep.equal(expected);
    });

    it('Test 7 - Real input', function () {
        const actual = timesToScenes.labelTimeToIntervals(timestampByLabel, detectionResult);

        const expected = [ 
            { person: 'Adam Brody', scencs: [] },
            { person: 'Angelina Jolie', scencs: [] },
            { person: 'Brad Pitt', scencs: [ '1026.5-1028.5', '5458-5460' ] },
            { person: 'Kerry Washington', scencs: [] },
            { person: 'Michelle Monaghan', scencs: [] },
            { person: 'Vince Vaughn', scencs: [ '5356-5361', '5383.5-5385.5' ] }];

        expect(actual).to.deep.equal(expected);
    });
});

describe('Suite - collectTimestamps', function () {
    const detectionResult = {
        "download_progress": 100,
        "classification_progress": 100,
        "status": "Classification complete",
        "label_dict": {
            "0": "Adam Brody",
            "1": "Angelina Jolie",
            "2": "Brad Pitt",
            "3": "Kerry Washington",
            "4": "Michelle Monaghan",
            "5": "Vince Vaughn"
        },
        "state": "success",
        "detections": {
            "5356": [
                {
                    "labels": {
                        "5": 0.9986
                    },
                    "bbox": {
                        "width": 0.2365,
                        "top": 0,
                        "height": 0.8039,
                        "left": 0.2436
                    }
                }
            ],
            "5360": [
                {
                    "labels": {
                        "5": 0.9982
                    },
                    "bbox": {
                        "width": 0.1312,
                        "top": 0.1713,
                        "height": 0.4392,
                        "left": 0.3138
                    }
                }
            ],
            "5361": [
                {
                    "labels": {
                        "5": 0.9984
                    },
                    "bbox": {
                        "width": 0.1335,
                        "top": 0.1796,
                        "height": 0.4254,
                        "left": 0.3103
                    }
                }
            ],
            "5458": [
                {
                    "labels": {
                        "2": 0.9981
                    },
                    "bbox": {
                        "width": 0.2202,
                        "top": 0.1243,
                        "height": 0.71,
                        "left": 0.5117
                    }
                }
            ],
            "1026.5": [
                {
                    "labels": {
                        "2": 0.9981
                    },
                    "bbox": {
                        "width": 0.0819,
                        "top": 0.1575,
                        "height": 0.2624,
                        "left": 0.4251
                    }
                }
            ],
            "5383.5": [
                {
                    "labels": {
                        "5": 0.9987
                    },
                    "bbox": {
                        "width": 0.137,
                        "top": 0.1326,
                        "height": 0.442,
                        "left": 0.2717
                    }
                }
            ]
        },
        "video_id": "5a3ec65b37939b0013123535",
        "detection_fps": 2
    };

    it('Test 1 - Null input', function () {
        const input = null;
        const actual = timesToScenes.collectTimestamps(input);

        const expected = {};

        expect(actual).to.deep.equal(expected);
    });

    it('Test 2 - Undefined input', function () {
        const input = undefined;
        const actual = timesToScenes.collectTimestamps(input);

        const expected = {};

        expect(actual).to.deep.equal(expected);
    });

    it('Test 3 - Empty input', function () {
        const input = {};
        const actual = timesToScenes.collectTimestamps(input);

        const expected = {};

        expect(actual).to.deep.equal(expected);
    });

    it('Test 4 - Real input', function () {
        const input = detectionResult;
        const actual = timesToScenes.collectTimestamps(input);

        const expected = {"0": [], "1": [], "2": [1026.5, 5458], "3": [], "4": [], "5": [5356, 5360, 5361, 5383.5]};

        expect(actual).to.deep.equal(expected);
    });
});

describe('Suite getScenes', function () {
    const detectionResult = {
        "download_progress": 100,
        "classification_progress": 100,
        "status": "Classification complete",
        "label_dict": {
            "0": "Adam Brody",
            "1": "Angelina Jolie",
            "2": "Brad Pitt",
            "3": "Kerry Washington",
            "4": "Michelle Monaghan",
            "5": "Vince Vaughn"
        },
        "state": "success",
        "detections": {
            "5356": [
                {
                    "labels": {
                        "5": 0.9986
                    },
                    "bbox": {
                        "width": 0.2365,
                        "top": 0,
                        "height": 0.8039,
                        "left": 0.2436
                    }
                }
            ],
            "5360": [
                {
                    "labels": {
                        "5": 0.9982
                    },
                    "bbox": {
                        "width": 0.1312,
                        "top": 0.1713,
                        "height": 0.4392,
                        "left": 0.3138
                    }
                }
            ],
            "5361": [
                {
                    "labels": {
                        "5": 0.9984
                    },
                    "bbox": {
                        "width": 0.1335,
                        "top": 0.1796,
                        "height": 0.4254,
                        "left": 0.3103
                    }
                }
            ],
            "5458": [
                {
                    "labels": {
                        "2": 0.9981
                    },
                    "bbox": {
                        "width": 0.2202,
                        "top": 0.1243,
                        "height": 0.71,
                        "left": 0.5117
                    }
                }
            ],
            "1026.5": [
                {
                    "labels": {
                        "2": 0.9981
                    },
                    "bbox": {
                        "width": 0.0819,
                        "top": 0.1575,
                        "height": 0.2624,
                        "left": 0.4251
                    }
                }
            ],
            "5383.5": [
                {
                    "labels": {
                        "5": 0.9987
                    },
                    "bbox": {
                        "width": 0.137,
                        "top": 0.1326,
                        "height": 0.442,
                        "left": 0.2717
                    }
                }
            ]
        },
        "video_id": "5a3ec65b37939b0013123535",
        "detection_fps": 2
    };
    const errorMessage = {
        "message": "Invalid credentials",
        "code": "authorization_err"
    };
    it('Test 1 - Null input', function () {
        const input = null;
        const actual = timesToScenes.getScenes(input);

        const expected = [];

        expect(actual).to.deep.equal(expected);
    });

    it('Test 2 - Undefined input', function () {
        const input = undefined;
        const actual = timesToScenes.getScenes(input);

        const expected = [];

        expect(actual).to.deep.equal(expected);
    });

    it('Test 3 - Empty input', function () {
        const input = {};
        const actual = timesToScenes.getScenes(input);

        const expected = [];

        expect(actual).to.deep.equal(expected);
    });

    it('Test 4 - Error message input', function () {
        const input = errorMessage;
        const actual = timesToScenes.getScenes(input);

        const expected = errorMessage;

        expect(actual).to.deep.equal(expected);
    });

    it('Test 5 - Real input', function () {
        const input = detectionResult;
        const actual = timesToScenes.getScenes(input);

        const expected = [ 
            { person: 'Adam Brody', scencs: [] },
            { person: 'Angelina Jolie', scencs: [] },
            { person: 'Brad Pitt', scencs: [ '1026.5-1028.5', '5458-5460' ] },
            { person: 'Kerry Washington', scencs: [] },
            { person: 'Michelle Monaghan', scencs: [] },
            { person: 'Vince Vaughn', scencs: [ '5356-5361', '5383.5-5385.5' ] }];

        expect(actual).to.deep.equal(expected);
    });
});

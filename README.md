# VideoScene

This project provide API endpoint on localhost:3000/video_scenes/:videoID that return a JSON that contains people and scenes they appeared in the video.

## Overview
Dependencies:
	Express
	Matroid
	body-parser

Dev Dependencies:
	Mocha
	Chai

Code structure:
	root
		-app.js
		-config.js
		-handlers
			-respondScenes.js
			-timeToScenes.js
		-routes
			-videoScenes.js
		-tests
			-handlers_timesToScenes.test.js
		-bash
			-init.sh
			-run.sh
			-test.sh
		-package.json
		-package-lock.json
		-README.md

Modules:
	app.js: The main!

	config.js: Parameters.

	routes/videoScenes.js: The one for API end point, handles all request that goes to video_scenes/:videoID.

	handlers/respondScenes.js: The callback for routes/videoScenes.js, handles all request and response. Used matroid's module and promise operation chaining to send response.

	handlers/timeToScenes.js: Provide functionalities to extract scenes from result data.
		functions:
			getScenes: 
				Wrapper function of the whole module. Extract scenes from video detection result.
				@param {Object} result The parsed video detection result.
				@return {Object[]} The array of objects in form of {"person": "name", "scenes": ["a-b", "b-c"]}.

				This function calls collectTimestamps and labelTimeToIntervals.

				This function may read in a JSON object that contains error message, and error messages are passed to clients directly.

			collectTimestamps:
				Collect timestamps for each label, each label for a person
				@param {Object} result The parsed video detection result.
				@return {Object} The object contains key-value pair in form of {label: [x, y, z]}.

				This function does data preparation for labelTimeToIntervals function.

			labelTimeToIntervals:
			 	Convert label to timestamp to person and scenes.
			 	@param {Object} labelTimeDict The object contains key-value pair in form of {label: [x, y, z]}.
			 	@return {Object[]} The array of objects in form of {"person": "name", "scenes": ["x-y"]}.

			 	This function calls timestampsToScenes over each timestamps collection for each label to get the required format scenes.

			 timestampsToScenes:
			 	Convert timestamps to scenes.
			 	@param {number[]} timestamps The array of timestamps.
			 	@return {Object[]} The array scenes, each entry in form of "x-y".

			 	There are two thresholds controlling the behavior of this function: minDuration and maxTimeLapse. The first one is required in the project requirement as 2 secs. The second one is the maximum time lapse we consider two timestamps belong to the same scene.

	tests/handlers_timesToScenes.test.js: test module, currently only tested handlers/timeToScenes.js.

## Scene clustering metric
	The implemented method works as follows:
		The purpose of the project in a possible senario is that clients have videos and they want to jump to scenes where a certain person appears to view some "moments". Some the scenes should not be too scattered across the video, and, say a 5 minutes scenes where a certain person appears for 2 minutes, is acceptable, because usually a scene can be a bit longer than just 20 seconds or so since there are some plots going on and the person client want to see is always in the scenes's "context".
		For this purpose, I set the maximum timelapse that two timestamps can be clustered in to a scene as 20 seconds. This setting gives a reasonable amount of sences for a given video. But this setting is for movies specificly. Suppose we are given a camera video and the client only want to see scenes where the occurance of a certain person is dense, the maximum timelapse can be set to 2-4 secs. Personally, I think the impemented method requires different setting when given varioud types of videos.
		In addition, the implementation can be faster after some code optimization and even with the help of other languages as node.js is fast for its asynchronization, not its processing speed.

	The ideal(probably) method:
		This scene extracting job can be seen as a 1D array clustering problem. Since the data is 1D, we can use a method called Density Estimation to determine the density of timestamps first. Then, starting from peak values (center of dense areas), we want to descend to a given density threshold both backword and forward, and we can find a scene start time and scene end time near the time corresponding to the thresholds. This can given us a very natural clustering of timestamps.
		However, this method might be calculation requiring and the result is slow response. 

## Some future improvements

Improved scene clustering method.

More elegant error message handling from video result endpoint.

Clever code for secene extraction. I heard map might be slower that for loops?

Loggin of resuests and monitoring of the server.

## Getting Started

All commands you need are in ./bash path. We will get to them in the following sections.

### Installing

Simply run the bash file at path ./bash/init.sh, and you are good to go.

## Running the tests

To run the tests, either use "npm test", or run ./bash/test.sh.

### Tested functions

I wrote tests for the module in ./handler/timesToScenes.js. There are four functions, working together to extract scenes from detection results return from matroid's video result API calls.

Each function was tested with illegal inputs first, then some toy inputs, and at last some real inputs.

## Deployment

This project is supposed to run on localhost for now.
To start the server, either use "node app.js", or run ./bash/run.sh, and access localhost:3000/video_scenes/:videoID.

## Built With

* [Express] - The web framework used
* [Matroid] - API endpoint query
* [Mocha] - Test framework
* [Chai] - Assertion Library

## Versioning

Currently there is only one version 1.0.0. 

## Authors

* **Dianqi Ji** - *Initial work*

## License

This project is licensed under the ISC License.


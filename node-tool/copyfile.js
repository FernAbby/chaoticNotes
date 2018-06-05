var fs = require('fs-extra');
var path = require('path');

var localDir = path.join(__dirname, "build");
var targetDir = path.join(__dirname, "../../web/cmc-console");

fs.emptyDirSync(targetDir);

fs.copySync(localDir, targetDir);



//package.json运行

// "scripts": {
//     "copy": "node copyfile.js",
//         "build-css": "node-sass-chokidar src/ -o src/",
//         "watch-css": "npm run build-css && node-sass-chokidar src/ -o src/ --watch --recursive",
//         "start-js": "react-scripts-ts start",
//         "start": "npm-run-all -p watch-css start-js",
//         "build-js": "react-scripts-ts build",
//         "build": "npm-run-all build-css build-js copy",
//         "test": "react-scripts-ts test --env=jsdom",
//         "eject": "react-scripts-ts eject"
// },

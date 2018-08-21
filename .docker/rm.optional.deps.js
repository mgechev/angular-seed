const fs = require('fs');

/**
 * This is a workaround due to 'npm install --no-optional' not working as expected:
 * https://github.com/npm/npm/issues/17633
 * https://github.com/npm/npm/issues/20769
 * To be used when building docker images, since they don't need test libraries installed
 */
// package.json
const npmPackage = JSON.parse(fs.readFileSync('package.json'));
delete npmPackage['optionalDependencies'];
fs.writeFileSync('package.json', JSON.stringify(npmPackage, null, 2));

const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const settingsPath = path.join(__server, 'settings.yaml');
module.exports = yaml.safeLoad(fs.readFileSync(settingsPath, 'utf8'));

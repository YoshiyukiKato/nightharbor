const csvSync = require('csv-load-sync');
const glob = require("glob");

/**
 * read target list from csv
 * @param {string} targetConfigPathPatterns 
 */
function readCsvTargetList(targetConfigPathPatterns){
  return targetConfigPathPatterns.map((pattern) => glob.sync(pattern))
    .reduce((acc, targetConfigList) => [...acc, ...targetConfigList], [])
    .map(csvSync)
    .reduce((acc, targetList) => [...acc, ...targetList], []);
}

module.exports = {
  readCsvTargetList
}
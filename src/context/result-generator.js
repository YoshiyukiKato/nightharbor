/**
  * concat target info and lighthouse audits
  * @param {*} targetInfo 
  * @param {*} lighthouseResult 
  */

exports.generateResult = function(targetInfo, lighthouseResult){
  const lighthouseAudits = extractAudits(lighthouseResult);
  return Object.assign(Object.assign({}, targetInfo), lighthouseAudits);
}

function extractAudits(lighthouseResult){
  const audits = lighthouseResult.lhr.audits;
  return Object.keys(audits).reduce((acc, key) => {
    if(audits[key].score !== undefined){
      acc[key] = audits[key].score;
    }
    return acc;
  }, {});
}
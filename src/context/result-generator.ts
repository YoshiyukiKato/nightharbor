/**
 * concat target info and lighthouse audits
 * @param {*} targetInfo
 * @param {*} lighthouseResult
 */

export function generateResult(targetInfo: any, lighthouseResult: any) {
  const lighthouseAudits = extractAudits(lighthouseResult);
  return Object.assign(Object.assign({}, targetInfo), lighthouseAudits);
}

function extractAudits(lighthouseResult: any) {
  const audits = lighthouseResult.lhr.audits;
  return Object.keys(audits).reduce((acc: any, key: string) => {
    if (audits[key].score !== undefined) {
      acc[key] = audits[key].score;
    }
    return acc;
  }, {});
}

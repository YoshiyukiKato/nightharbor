export function parseAudits(lighthouseResult: any) {
  const audits = lighthouseResult.lhr.audits;
  return Object.keys(audits).reduce((acc: any, key: string) => {
    if (audits[key].score !== undefined) {
      acc[key] = audits[key].score;
    }
    return acc;
  }, {});
}

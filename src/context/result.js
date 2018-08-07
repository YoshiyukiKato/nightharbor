/**
 * レポーティングに使う情報を格納するオブジェクト
 * @class
 * @name Result
 * @prop {Target} target lightouse実行対象
 * @prop {any} result lighthouse実行結果
 * @prop {any} audits auditsのみ取り出したもの
 */
class Result {
  /**
   * @constructor
   * @param {any} target lighthosue実行対象
   * @param {any} lighthouseResult lighthouse実行結果
   */
  constructor(target, lighthouseResult){
    this.target = target;
    this.result = lighthouseResult;
    this.audits = getAuditsFromResult(lighthouseResult.lhr);
  }

  getData(){
    const data = Object.assign({}, this.target);
    data["speed-index"] = this.audits["speed-index"];
    return data;
  }
}

// Usage:
function getAuditsFromResult(result){
  return Object.keys(result.audits).reduce((acc, key) => {
    if(result.audits[key].score !== undefined){
      acc[key] = result.audits[key].score;
    }
    return acc;
  }, {});
}

module.exports = Result;
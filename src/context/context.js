const {generateResult} = require("./result-generator");
const cliProgress = require('cli-progress');

/**
 * 非同期的なlighthouse実行コンテクストを管理するクラス
 * @class
 * @name Context
 */
class Context {
  /**
   * @constructor
   * @param {Target[]} targets 
   * @param {Reporter} reporter 
   */
  constructor(targets, reporters) {
    this.targets = targets;
    this.reporters = reporters;
    this.reporters.forEach(reporter => reporter.open());
    this.progressBar = new cliProgress.Bar({}, cliProgress.Presets.shades_classic);
    this.progressBar.start(this.targets.length, 0);
  }

  /**
   * get next lighthouse targets
   * @return {Target[]} next targets
   */
  getNextTargets(targetNum=1) {
    const targets = [];
    let target;
    for(let i=0; i<targetNum; i++){
      target = this.targets.shift();
      if(!!target){
        targets.push(target);
      }
    }
    return targets;
  }

  /**
   * pass result data to reporters. 
   * @param {Target} target info about lighthouse target
   * @param {{lhr}} lighthouseResult result of lighthouse execution for the target
   */
  addReport(target, lighthouseResult) {
    this.reporters.forEach(reporter => reporter.write(generateResult(target, lighthouseResult)));
    this.progressBar.increment();
  }

  /**
   * close execution context
   */
  close() {
    this.reporters.forEach(reporter => reporter.close());
    this.progressBar.stop();
    return this;
  }
}

module.exports = Context;
const {generateResult} = require("./result-generator");
const cliProgress = require('cli-progress');

/**
 * manage context of asynchronous lighthouse executions
 * @class
 * @name Context
 */
class Context {
  /**
   * @constructor
   * @param {Target[]} targets 
   * @param {TargetLoader[]} targetLoaders
   * @param {Reporter} reporter 
   */
  constructor(targets, targetLoaders, reporters) {
    this.targets = targets;
    this.targetLoaders = targetLoaders;
    this.reporters = reporters;
    this.reporters.forEach(reporter => reporter.open());
  }

  /**
   * initialize targets in context by exec registered loaders
   * @return {Promise<Context>}
   */
  loadTargets(){
    const loaderPromises = this.targetLoaders.map((targetLoader) => targetLoader.load());
    return Promise.all(loaderPromises)
      .then((results) => {
        this.targets = this.targets.concat(results.reduce((acc, targets) => [...acc, ...targets], []));
        this.progressBar = new cliProgress.Bar({}, cliProgress.Presets.shades_classic);
        this.progressBar.start(this.targets.length, 0);
        return this;
      });
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
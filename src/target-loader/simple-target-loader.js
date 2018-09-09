const TargetLoader = require("./target-loader");

class SimpleTargetLoader extends TargetLoader {
  constructor(targets){
    super();
    this.targets = targets;
  }

  load(){
    return Promise.resolve(this.targets);
  }
}

module.exports = SimpleTargetLoader;
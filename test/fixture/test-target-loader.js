const TargetLoader = require("../../src/target-loader/target-loader");

class TestTargetLoader extends TargetLoader{
  /**
   * @override
   */
  load(){
    return Promise.resolve([
      { url: 'https://github.com' }
    ]);
  }
}

module.exports = TestTargetLoader;
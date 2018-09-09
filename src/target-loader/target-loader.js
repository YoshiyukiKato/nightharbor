/* istanbul ignore file */
class TargetLoader{
  /**
   * must be overriden
   * @return {Promise<any>} targets 
   */
  load(){
    return Promise.reject("`load` method is not implemented");
  }
}

module.exports = TargetLoader;
/**
 * @class
 * @name Reporter
 */
class Reporter{
  /**
   * will be called before all executions
   * @return {void}
   */
  open(){
    throw new Error("`open` method is not implemented");
  }

  /**
   * will be called when a lighthouse execution completed
   * @param {any} result
   * @return {void}
   */
  write(result){
    throw new Error("`write` method is not implemented");
  }

  /**
   * will be called after all executions
   * @return {Promise}
   */
  close(){
    throw new Error("`close` method is not implemented");
  }
}

module.exports = Reporter;
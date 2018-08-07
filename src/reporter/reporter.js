/**
 * 結果の出力を行うクラス
 * @class
 * @name Reporter
 */
class Reporter{
  /**
   * 処理コンテクストの開始時に実行される
   */
  open(){
    console.warn("open method was not implemented");
  }

  /**
   * 各ターゲットへのlighthouse実行結果レポーティング時に呼ばれる
   * @param {Result} result
   */
  write(result){
    console.log(report);
    console.warn("write method was not implemented");
  }

  /**
   * 処理コンテクストの終了時に実行される
   */
  close(){
    console.warn("close method was not implemented");
  }
}

module.exports = Reporter;
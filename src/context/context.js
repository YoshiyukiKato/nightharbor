const Result = require("./result");
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
   * 次のlighthouse実行対象のデータを取得する
   * @return {Target} 次のlighthouse実行対象オブジェクト
   */
  getNextTarget() {
    return this.targets.shift();
  }

  /**
   * lighthouse実行結果のレポーティングを行う。
   * レポーティング処理は、Contextインスタンス生成時にコンストラクタに渡したreporterに移譲する
   * @param {Target} target lighthouseの実行対象
   * @param {{lhr}} lighthouseResult lighthouseの実行結果 
   */
  addReport(target, lighthouseResult) {
    const result = new Result(target, lighthouseResult);
    this.reporters.forEach(reporter => reporter.write(result));
    this.progressBar.increment();
  }

  /**
   * lighthouse実行コンテクストを閉じる
   */
  close() {
    this.reporters.forEach(reporter => reporter.close());
    this.progressBar.stop();
  }
}

module.exports = Context;
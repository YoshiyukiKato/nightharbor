const fs = require("fs");
const Reporter = require("./reporter");

/**
 * lighthouseの実行結果をファイルに出力する
 */
class FileReporter extends Reporter{
  constructor(outputFilePath){
    super();
    this.outputFilePath = outputFilePath;
  }
  
  open(){
    this.ws = fs.createWriteStream(this.outputFilePath);
  }

  write(result){
    const data = result.getData();
    this.ws.write(JSON.stringify(data) + "\n");
  }

  close(){
    this.ws.close();
  }
}

module.exports = FileReporter;
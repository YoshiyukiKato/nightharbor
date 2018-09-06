const fs = require("fs");
const Reporter = require("../reporter");

/**
 * output result to json file
 */
class JsonReporter extends Reporter{
  constructor(outputFilePath){
    super();
    this.outputFilePath = outputFilePath;
    this.isFirstDataWritten = false;
  }
  
  open(){
    this.ws = fs.createWriteStream(this.outputFilePath);
    this.ws.write("{\"results\":[");
  }

  write(result){
    const separator = this.isFirstDataWritten ? "," : "";
    this.isFirstDataWritten = true;
    const reportJson = JSON.stringify(result);
    this.ws.write(separator + reportJson);
  }

  close(){
    this.ws.write("]}");
    this.ws.close();
  }
}

module.exports = JsonReporter;
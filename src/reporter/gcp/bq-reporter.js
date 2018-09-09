const Reporter = require('../reporter');

class BQReporter extends Reporter{
  constructor(bq, datasetId, tableId){
    super();
    this.bq = bq;
    this.datasetId = datasetId;
    this.tableId = tableId;
  }
  
  open(){
    this.resultDataList = [];
  }
  
  write(result){
    const dataKeyParsed = Object.keys(result).reduce((dataKeyParsed, key) => {
      dataKeyParsed[key.replace(/-/g, "_")] = result[key];
      return dataKeyParsed;
    }, {});
    this.resultDataList.push(dataKeyParsed);
  }

  close(){
    return this.bq
      .dataset(this.datasetId)
      .table(this.tableId)
      .insert(this.resultDataList)
      .then();
  }
}

module.exports = BQReporter;
const Reporter = require('../reporter');

class BQReporter extends Reporter{
  constructor(bq, projectId, datasetId, tableId){
    super();
    this.bq = bq;
    this.projectId = projectId;
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
      .then(() => {
        console.log(`DONE!!\n  PROJECT_ID:${this.projectId}\n  DATASET:${this.datasetId}\n  TABLE:${this.tableId}`);
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
      });
  }
}

module.exports = BQReporter;
const Reporter = require('./reporeter');

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
    const data = result.getData();
    const dataKeyParsed = Object.keys(data).reduce((dataKeyParsed, key) => {
      dataKeyParsed[key.replace(/-/g, "_")] = data[key];
      return dataKeyParsed;
    }, {});
    this.resultDataList.push(dataKeyParsed);
  }

  close(){
    this.bq
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
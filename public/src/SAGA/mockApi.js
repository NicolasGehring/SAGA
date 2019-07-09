export class mockApi {
  constructor(success) {
    //We add +0.2 otherwise it is possible that some transactions are too quick
    this.delay = (Math.random() + 0.2) * 4000;
    this.success = success;
  }
  //This function returns a function which will return a Promise which will either be
  //succsessfull or fail depending on the initalisation of the mockAPI object
  generateFunction(responseObject) {
    if (this.success) {
      return async () => {
        //This set's a non-blocking timeout for the function
        await new Promise(resolve => setTimeout(resolve, this.delay));
        var response = new Promise(function(resolve, reject) {
          resolve(responseObject);
        });
        return response;
      };
    } else {
      return async () => {
        //This set's a non-blocking timeout for the function
        await new Promise(resolve => setTimeout(resolve, this.delay));
        var response = new Promise(function(resolve, reject) {
          reject(Error("Api call failed"));
        });
        return response;
      };
    }
  }

  generateRollback(responseObject) {
    return async () => {
      //This set's a non-blocking timeout for the function
      await new Promise(resolve => setTimeout(resolve, this.delay));
      var response = new Promise(function(resolve, reject) {
        resolve(responseObject);
      });
      return response;
    };
  }
}

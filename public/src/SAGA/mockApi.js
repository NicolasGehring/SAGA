export class mockApi {
  constructor(success) {
    this.delay = Math.random() * 5000;
    this.success = success;
  }
  //This function returns a function which will return a Promise which will either be
  //succsessfull or fail debending on the initalisation of the mockAPI object
  generateFunction() {
    if (this.success) {
      return async () => {
        //This set's a non-blocking timeout for the function
        await new Promise(resolve => setTimeout(resolve, this.delay));
        var response = new Promise(function(resolve, reject) {
          resolve({ name: "Nicolas", surname: "Gehring" });
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
}

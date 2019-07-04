import { SagaLog } from "./SagaLogs.js";
import { TransactionStatus } from "./transactionStatus.js";
export class SagaExecutionCoordiantor {
  //The execution coordinator get's an array of Saga objects which need to be performed
  //Each object has a task and a rollback action
  constructor(sagas) {
    this.sagas = sagas;
    //We initialize our log to visualize the intern of the transaction
    this.log = new SagaLog();
    //We initialize the status to show the current status of each transaction
    this.transactionStatus = new TransactionStatus(sagas);
    //The index keeps track about the currently executed Saga
    this.index = 0;
  }

  async run() {
    //Depending on this variable we decide if we have to execute the rollback action
    //If any Saga fails the boolean is true and all rollback actions get performed
    var failure = false;
    //STEP 1: We start the Saga and log the beginning of the SAGA
    this.log.add("Started SAGA execution");

    while (this.index < this.sagas.length && !failure) {
      const saga = this.sagas[this.index];
      try {
        //STEP 2: We iterate over every saga which was given to us and log there beginning
        this.log.add(`Started Saga with ID ${saga.id} `);
        this.transactionStatus.updateStatus(saga, "pending");
        const result = await saga.executeTask();
        this.transactionStatus.updateStatus(saga, "finished");
        //We show the result of the query
        this.transactionStatus.updateResolution(saga, JSON.stringify(result));
        this.log.add(`Saga with ID ${saga.id} completed with `);
      } catch (err) {
        this.log.add(`Saga with ID ${saga.id} Failed`);
        this.transactionStatus.updateStatus(saga, "failed");
        this.transactionStatus.updateResolution(saga, err);

        //We save that an error occured during execution
        failure = true;
        //We lower the index to the last succesfull SAGA
        this.index--;
        break;
      }
      //We execute the next Sage in our list
      this.index++;
    }
    //STEP3: Check if an error occured and perform accordingly
    //From the last succesful Saga till the first one we perform the rollback action
    if (failure) {
      while (this.index >= 0) {
        const saga = this.sagas[this.index];
        try {
          //STEP 4: We iterate over every saga which needs to be compensated
          this.log.add(`Started Saga Rollback with ID ${saga.id} `);
          this.transactionStatus.updateStatus(saga, "compensating");
          const result = await saga.executeCompensation();
          this.transactionStatus.updateResolution(saga, JSON.stringify(result));
          this.log.add(`Saga with ID ${saga.id} compensated `);
          this.transactionStatus.updateStatus(saga, "finished");
        } catch (err) {
          this.log.add(`Saga with ID ${saga.id} Failed during compensation`);
        }
        //We execute the next Sage in our list
        this.index--;
      }
    }
    this.log.add("SAGA Execution complete");
  }
}

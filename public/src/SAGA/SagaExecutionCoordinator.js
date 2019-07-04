import { SagaLog } from "./SagaLogs.js";

export class SagaExecutionCoordiantor {
  //The execution coordinator get's an array of Saga objects which need to be performed
  //Each object has a task and a rollback action
  constructor(sagas) {
    this.sagas = sagas;
    this.log = new SagaLog();
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
        const result = await saga.executeTask();
        this.log.add(
          `Saga with ID ${saga.id} completed with ${JSON.stringify(result)}`
        );
      } catch (err) {
        this.log.add(`Saga with ID ${saga.id} Failed`);
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
          await saga.executeCompensation();
          this.log.add(`Saga with ID ${saga.id} compensated `);
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

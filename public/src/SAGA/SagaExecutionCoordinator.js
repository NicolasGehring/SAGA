import { SagaLog } from "./SagaLogs.js";

export class SagaExecutionCoordiantor {
  //The execution coordinator get's an array of Saga objects which need to be performed
  //Each object has a task and a rollback action
  constructor(sagas) {
    this.sagas = sagas;
    this.log = new SagaLog();
  }

  run() {
    //Depending on this variable we decide if we have to execute the rollback action
    //If any Saga fails the boolean is true and all rollback actions get performed
    var failure = false;
    //Failure ID is saved because the sage which failed doesn't need to be compensated
    var failureID;
    //STEP 1: We start the Saga and log the beginning of the SAGA
    this.log.add("Started SAGA execution");

    //important the callbackfunction has to be async otherwise await is not working
    this.sagas.forEach(async saga => {
      try {
        //STEP 2: We iterate over every saga which was given to us and log there beginning
        this.log.add(`Started Saga with ID ${saga.id} `);
        const result = await saga.executeTask();
        this.log.add(`Saga with ID ${saga.id} completed with ${result}`);
      } catch (err) {
        this.log.add(`Saga with ID ${saga.id} Failed`);
        //We save that an error occured during execution
        failure = true;
        //TODO: make this an array
        failureID = saga.id;
      }
    });

    //Depending on the errors we trigger the rollback proccess
    if (failure) {
      this.sagas.forEach(async saga => {
        //We don't rollback the Saga which failed
        //if (saga.id == failureID) {continue}
        try {
          //STEP 2: We iterate over every saga which was given to us and log there beginning
          this.log.add(`Started Compensating Saga with ID ${saga.id} `);
          const result = await saga.executeCompensation();
          this.log.add(
            `Saga with ID ${saga.id} was correctly compensated`,
            result
          );
        } catch (err) {
          this.log.add(`Saga with ID ${saga.id} Failed during compensation`);
        }
      });
    }
  }
}

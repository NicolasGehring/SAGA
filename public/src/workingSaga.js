import { Saga } from "./SAGA/Saga.js";
import { SagaExecutionCoordiantor } from "./SAGA/SagaExecutionCoordinator.js";
import { mockApi } from "./SAGA/mockAPi.js";

const api1 = new mockApi(true);
//generate function returns a functino which returns a promise. This promise will
//be successfull or fail depending on the boolean which was used to initialize mockApi
//the Promis returns after a random time between 0-5s which is initalized inside the
//mockAPI class
const task = api1.generateFunction();
//The call to our mockApi is the task for the SAGA
const saga = new Saga(task, () => {
  return null;
});

const api2 = new mockApi(false);
const task2 = api2.generateFunction();
const saga2 = new Saga(task2, () => {
  return null;
});

const sagaArray = [saga, saga2];
var SEC = new SagaExecutionCoordiantor(sagaArray);
SEC.run();

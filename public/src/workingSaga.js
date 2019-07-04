import { Saga } from "./SAGA/Saga.js";
import { SagaExecutionCoordiantor } from "./SAGA/SagaExecutionCoordinator.js";
import { mockApi } from "./SAGA/mockAPi.js";

const api1 = new mockApi(true);
//generate function returns a functino which returns a promise. This promise will
//be successfull or fail depending on the boolean which was used to initialize mockApi
//the Promis returns after a random time between 0-5s which is initalized inside the
//mockAPI class
const task1 = api1.generateFunction({ hotel: "Hostel Bravo", id: "143-112" });
const rollback1 = api1.generateRollback("Reservation 143-112 was canceled");
//The call to our mockApi is the task for the SAGA
const saga = new Saga(task1, rollback1);

const api2 = new mockApi(true);
const task2 = api2.generateFunction({ hike: "Waterfal Hike", id: "124652" });
const rollback2 = api2.generateRollback("Hike 124652 was canceled");
const saga2 = new Saga(task2, rollback2);

const api3 = new mockApi(true);
const task3 = api3.generateFunction({
  payment: "103,54€",
  id: "124652",
  state: "succsess"
});
const rollback3 = api3.generateRollback("Payment was canceled");
const saga3 = new Saga(task3, rollback3);

const api4 = new mockApi(true);
const task4 = api4.generateFunction({ test: "test" });
const rollback4 = api4.generateRollback("Payment was canceled");
const saga4 = new Saga(task4, rollback4);
const sagaArray = [
  saga,
  saga2,
  saga3,
  saga4,
  saga4,
  saga4,
  saga4,
  saga4,
  saga4
];
var SEC = new SagaExecutionCoordiantor(sagaArray);
SEC.run();

//Each Saga has a unique ID get ID is a static method which
//is not bound to an object
var id = 0;
function getId() {
  return id++;
}
export class Saga {
  constructor(task, compensation, description) {
    this.task = task;
    this.compensation = compensation;
    this.id = getId();
    this.description = description;
  }

  async executeTask() {
    return await this.task();
  }
  async executeCompensation() {
    return await this.compensation();
  }
}

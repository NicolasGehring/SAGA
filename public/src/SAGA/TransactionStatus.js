//This function is responsible to draw a table with log entries onto the html

export class TransactionStatus {
  constructor(sagas) {
    this.table = document.createElement("table");
    //We create a table header
    const task = document.createElement("th");
    task.innerHTML = "Task";
    this.table.appendChild(task);
    const status = document.createElement("th");
    status.innerHTML = "Status";
    this.table.appendChild(status);

    const resolution = document.createElement("th");
    resolution.innerHTML = "Resolution";
    this.table.appendChild(resolution);

    //Now we map every Saga transaction to a entry in the table
    // with the fields TASK | STATUS | RESOLUTION
    sagas.forEach(saga => {
      const newRow = document.createElement("tr");
      //Each row get's a unique id so it can be found later when it
      //is required to update the row
      newRow.setAttribute("id", saga.id);
      const task = document.createElement("td");
      task.innerHTML = saga.description;
      newRow.appendChild(task);

      //The status is "prepared" when initialzied
      const status = document.createElement("td");
      status.innerHTML = "prepared";
      //The status has different id's depending on the status they are used to change the colors
      status.setAttribute("status", "prepared");
      newRow.appendChild(status);

      //The reult is "TBD" when initialzied
      const result = document.createElement("td");
      result.innerHTML = "TBD";
      result.setAttribute("resolution", "");

      newRow.appendChild(result);

      //Add the new Row to the table
      this.table.appendChild(newRow);
    });

    document.querySelector(".status").appendChild(this.table);
  }
  updateStatus(saga, value) {
    //in order to change the status we query the respective element
    //And change the status attribute of the table entry. Css will color it differently
    var tableEntry = document.querySelector(`tr[id='${saga.id}'] > td[status]`);
    console.log("entry", tableEntry);
    switch (value) {
      case "pending":
        tableEntry.setAttribute("status", "pending");
        tableEntry.innerHTML = "pending";
        break;

      case "finished":
        tableEntry.setAttribute("status", "finished");
        tableEntry.innerHTML = "finished";
        break;
        break;
      case "failed":
        tableEntry.setAttribute("status", "failed");
        tableEntry.innerHTML = "failed";
        break;
      case "compensating":
        tableEntry.setAttribute("status", "compensating");
        tableEntry.innerHTML = "rollback";

        break;
      default:
        throw `No such value ${value}`;
        break;
    }
  }

  updateResolution(saga, resolution) {
    //in order to change the resolution we query the respective element
    //And change the resolution attribute of the table entry.
    var tableEntry = document.querySelector(
      `tr[id='${saga.id}'] > td[resolution]`
    );
    tableEntry.innerHTML = resolution;
  }
}

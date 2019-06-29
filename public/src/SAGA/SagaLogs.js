//This function is responsible to draw a table with log entries onto the html

export class SagaLog {
  constructor() {
    this.log = [];
    //We append the log to the DOM
    this.table = document.createElement("table");
    //We create a table header
    const header = document.createElement("th");
    header.innerHTML = "SAGA LOG";
    this.table.appendChild(header);
    document.querySelector(".log").appendChild(this.table);
  }
  add(item) {
    this.log.push(item);
    //We add the item to the log table
    const newRow = document.createElement("tr");
    const entry = document.createElement("td");
    entry.innerHTML = item;
    newRow.appendChild(entry);
    this.table.appendChild(newRow);
  }
}

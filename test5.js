const data = require("./target.json");
const fs = require("fs");

const map = new Map();

function calculateTotalTimeByCompany() {
  for (let obj of data) {
    const endDate = new Date(obj["endTimestamp"] * 1000);
    const startDate = new Date(obj["startTimestamp"] * 1000);
    let diff = endDate.getTime() - startDate.getTime();
    diff = diff / 1000;
    
    const companyName = obj["companyName"];

    if (map.has(companyName)) {
      const total = map.get(companyName) + diff;
      map.set(companyName, total);
    } else {
      map.set(companyName, diff);
    }
  }

  for (let obj of data) {
    const companyName = obj["companyName"];
    obj["totalTimeSpentByCompany"] = map.get(companyName);
  }

  fs.writeFileSync("target2.json", JSON.stringify(data));
}

calculateTotalTimeByCompany();

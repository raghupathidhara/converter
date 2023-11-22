const data = require("./target.json");
const fs= require("fs")

function addEventType() {
  for (let obj of data) {
    if (obj["event_type"] === "session_info" && obj?.email) {
      obj["event_type"] = "business_enquiry";
    }
    const set = new Set([
      "Germany",
      "Italy",
      "France",
      "Spain",
      "United Kingdom",
    ]);
    obj["countryRegion"] = "";
    if (set.has(obj.countryName)) {
      obj["countryRegion"] = "EU";
    }
  }

  fs.writeFileSync("target2.json", JSON.stringify(data));
}

addEventType();

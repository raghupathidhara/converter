const data = require("./target.json");
const fs= require("fs")

function addEventType() {

  const map= new Map();

  map.set("United States", "US");
  map.set("Canada", "CA");

  for (let obj of data) {

    if (map.has(obj.countryName)) {
      obj["countryRegion"] = map.get(obj.countryName);
    }
    if(obj.category=='report'){
      obj.category="Report";
    }
  }

  fs.writeFileSync("target2.json", JSON.stringify(data));
}

addEventType();

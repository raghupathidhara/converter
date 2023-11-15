let converter = require("json-2-csv");
const fs = require("fs");



async function convertToCsv() {
  
  let fileData = fs.readFileSync("target.json", "");
  
  fileData = JSON.parse(fileData);

  const csv = await converter.json2csv(fileData)
  fs.writeFileSync("data.csv", csv);

  console.log("converted json to csv successfully");
}

convertToCsv()

module.exports= convertToCsv;

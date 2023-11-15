let converter = require("json-2-csv");
const fs = require("fs");


async function convertCsvToJson() {
  console.log("convertion csv to json started");
  let fileData = fs.readFileSync("source.csv", "utf-8");
  

  const json = await converter.csv2json(fileData, {
    trimHeaderFields: true,
    trimFieldValues : true
  })
  return json;
}


module.exports= convertCsvToJson;

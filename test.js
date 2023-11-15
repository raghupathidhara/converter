const fs= require("fs");
const convertToCsv = require("./converter");
const convertCsvToJson = require("./csvToJsonConverter");

async function addUtmFields(){
    let data=  await convertCsvToJson()
    // data= JSON.parse(data);

    for(let obj of data){
        const url= obj.fullUrl;
        const source = getParameterByName("utm_source", url);
        const medium = getParameterByName("utm_medium", url);
        const campaign = getParameterByName("utm_campaign", url);

        obj["utm_source"]= source;
        obj["utm_medium"]= medium;
        obj["utm_campaign"]= campaign;
        obj["li_fat_id"]= getParameterByName("li_fat_id", url);
    }

    fs.writeFileSync("target.json", JSON.stringify(data));
    convertToCsv();
}


function getParameterByName(name, url) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    let regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(url);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
}


addUtmFields();



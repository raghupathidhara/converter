const fs= require("fs");
const convertToCsv = require("./converter");
const convertCsvToJson = require("./csvToJsonConverter");

async function filterRecords(){
    let data=  await convertCsvToJson();
    console.log("convertion csv to json finished");
    console.log("filteration started");
    const indices=[];
    for(let i=0;i<data.length;i++){
        const obj= data[i];
        if(obj["event_type"]==="com.amazon.rum.page_view_event"){
            indices.push(i);
        }
    }

    for(let index of indices){
        const item= data[index];
        const sessionId= item["sessionId"];
        const userId= item["userId"];
        for(let i=0;i<data.length;i++){
            if(data[i]["sessionId"]===sessionId && data[i]["userId"]===userId){
                data[i]["referrer"]= item["referrer"];
                data[i]["referrerDomain"]= item["referrerDomain"];
            }
        }
        
    }

    
    console.log("filteration ended");
    // fs.writeFileSync("target.json", JSON.stringify(data));

    removeEventRecords(data);

}



function removeEventRecords(data){
    // let data= fs.readFileSync("target.json", "")
    // data= JSON.parse(data);
    console.log("filteration started");
    
    const results=[]
    for(let i=0;i<data.length;i++){
        const obj= data[i];
        if(obj["event_type"]!=="com.amazon.rum.page_view_event"){
            results.push(obj);
        }
    }
  
    console.log("filteration ended", results.length);
    fs.writeFileSync("target.json", JSON.stringify(results));

    console.log("conversion from json to csv started");
    convertToCsv();

}

filterRecords()
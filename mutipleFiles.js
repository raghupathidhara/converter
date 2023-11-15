const fs= require("fs")
const convertToCsv= require("./converter")

let id=1;

const requiredData = {
  event_timestamp: "event_timestamp",
  event_type: "event_type",
  event_id: "event_id",
  browserName: "browserName",
  osName: "osName",
  deviceType: "deviceType",
  platformType: "platformType",
  parentPageId:"parentPageId",
  pageId: "pageId",
  interaction: "interaction",
  title: "title",
  countryCode: "countryCode",
  sessionId: "sessionId",
  userId: "userId",
  email: "email",
  event_detailsarea:"category",
  fullUrl: "fullUrl",
  ip: "ip",
  hostname: "hostname",
  domain: "companyDomain",
  companyname: "companyName",
  companytype:"companyType",
  countrycapital: "countryCapital",
  countrycode: "countryCode",
  countryname: "countryName",
  city: "city",
  latitude: "latitude",
  longitude: "longitude",
  timezone: "timezone",
  timestamp: "timestamp",
  unix: "unix",
  regioncode: "regionCode",
  regionname: "regionName",
  referrer:"referrer",
  referrerDomain:"referrerDomain",
};


function flattenObject(data, res, parentKey){
    for(let key in data){
        if(typeof data[key] == 'object'){
            flattenObject(data[key], res, key)
        }else{
            const key2= parentKey+key;
            if(key in requiredData){
                const newKey=requiredData[key];
                res[newKey]= data[key];
            }else if(key2 in requiredData){
                const newKey=requiredData[key2];
                res[newKey]= data[key];
            }
        }
    }
} 

function getResult(fileData){
    const resultsArray=[];
    for(let obj of fileData){
        const res={id:id}
        for(let key in requiredData){
            res[requiredData[key]]="";
        }
        flattenObject(obj, res);
        id++;
        delete res['0'];
        resultsArray.push(res);
    }
    return resultsArray;
}



let results=[];

function readMoreFiles(){
    const paths= fs.readdirSync("source");
    for(let path of paths){
        let fileData=fs.readFileSync(`./source/${path}`,{encoding:"utf-8"});
        fileData= JSON.parse(fileData)
        results= results.concat(getResult(fileData))
    }
    fs.writeFileSync("target.json", JSON.stringify(results));
    console.log("successfully flattened", results.length)
    convertToCsv()
}

readMoreFiles();

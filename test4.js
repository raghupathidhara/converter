const data = require("./target.json");
const fs= require("fs")

function generateRandom() {
  for (let obj of data) {
    if(obj['startTimestamp'] > obj['endTimestamp']){
      obj['endTimestamp']= obj['startTimestamp'];
    }
    if(obj['startTimestamp'] === obj['endTimestamp']){
      let sec=Math.round(Math.random()*10);
      if(sec==0) sec=1;
      else if(sec>=7) sec=sec%7;

      const date= new Date(obj['endTimestamp']*1000);
      date.setSeconds(date.getSeconds()+sec);
      obj['endTimestamp']=Math.round(date.getTime()/1000)
      
    }
  }

  fs.writeFileSync("target.json", JSON.stringify(data));
}

generateRandom();

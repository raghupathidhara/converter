const { writeFileSync } = require("fs");
const data= require("./target.json")
const map= new Map();

function groupRecords(){
    console.log("grouping the data")
    for(let obj of data){
        const sessionId= obj.sessionId;
        const userId= obj.userId;
        const key= sessionId+"|"+userId
        if(map.has(key)){
            map.get(key).push(obj);
        }else{
            map.set(key, [obj]);
        }
    }
    console.log("grouping completed", map.size)
    applyTimings()

}

function applyTimings(){
    console.log("maping start and end time")
    const keysIterator= map.keys();
    let results=[];
    let key=keysIterator.next().value;
    while(key){
            
            const arr= map.get(key);
            arr.sort((a, b)=> a?.unix - b?.unix);
            
            for(let i=1;i<arr.length;i++){
                const startTime= arr[i-1]?.timestamp
                const endTime= arr[i]?.timestamp;

                const sDate= new Date(startTime);
                const eDate= new Date(endTime);

                arr[i-1]['startTimestamp']= Math.round(sDate.getTime()/1000);
                arr[i-1]['endTimestamp']= Math.round(eDate.getTime()/1000);
            }
            const date= new Date(arr[arr.length-1].timestamp);
            arr[arr.length-1]['startTimestamp']= Math.round(date.getTime()/1000);
            arr[arr.length-1]['endTimestamp']= Math.round(date.getTime()/1000);
            results= results.concat(arr);
            
            key=keysIterator.next().value;

    }


    results.sort((a, b)=> a.id - b.id);

    console.log("mapping completed", results.length)

    writeFileSync("target2.json", JSON.stringify(results));
}


groupRecords();

const { writeFileSync } = require("fs");
const data= require("./target.json")


function addChannel(){
    console.log("started")
    for(let obj of data){
        
        let channel=""
        const referrer=obj.referrer;
        if(!referrer){
            channel="Other"
        }
        else if(referrer.includes("https://www.indegene.com")){
            channel="Direct"
        }
        else if(referrer.includes("https://careers.indegene.com")){
            channel="Careers"
        }
        else if(referrer.includes("https://digitalsummit.indegene.com")){
            channel="IDS"
        }else if(referrer.includes("https://www.google")){
            channel="Organic"
        }else {
            const list=["linkedin","facebook","twitter"];
            for(let item of list){
                if(referrer.includes(item)){
                    channel="Social";
                    break;
                }
            }
            if(!channel){
                channel="Third-party"
            }

        }

        obj["channel"]= channel;
        
    }

    writeFileSync("target2.json", JSON.stringify(data));
    console.log("ended")
}
addChannel();
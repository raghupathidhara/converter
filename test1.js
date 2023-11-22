const date= new Date(1694864443*1000);
console.log(Math.round(date.getTime()/1000));
date.setSeconds(date.getSeconds()+5);
console.log(Math.round(date.getTime()/1000));


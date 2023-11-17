const map= new Map();

map.set("1|2", "hello");
map.set("2", "hello");
map.set("3", "hello");

const keysIterator= map.keys();

let key= keysIterator.next().value;
while(key){
    const arr= key.split("|")
    console.log(arr);
    key= keysIterator.next().value;
}

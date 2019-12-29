setTimeout(()=>{
    console.log('timeout');
},0);

setImmediate(()=>{
    console.log('immediate');
});

process.nextTick(()=>{
    console.log('nextTick');
});

Promise.resolve().then(()=>console.log('promise'));

let i=1;

setInterval(()=>{
    if(i === 5){
        console.log('인터벌을 종료합니다.');
        process.exit();
    }
    console.log(i);
    i++;
},1000);
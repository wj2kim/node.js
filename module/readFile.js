const fs = require('fs');

fs.readFile('module/readme.txt',(err,data)=>{
    if(err){
        throw err;
    }
    console.log(data);
    console.log(data.toString());
});

// 즉 readFile의 형식은 버퍼의 형식으로 제공된다는 것을 알 수 있다.
// 버퍼 -> 메모리의 데이터 


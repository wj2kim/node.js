const fs = require('fs');

fs.writeFile('module/writeme.txt','글이 입력됩니다', (err)=>{
    if(err){
        throw err;
    }
    fs.readFile('module/writeme.txt',(err,data)=>{
        if(err){
            throw err;
        }
        console.log(data.toString());
    });
});


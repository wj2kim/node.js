// setInterval(()=>{
//     console.log('시작');
//     try{
//         throw new Error('서버를 고장내주마!');
//     }catch(err){
//         console.error(err);
//     }
// },1000);


const fs = require('fs');

setInterval(()=>{
    fs.unlink('./abcdefg.js',(err)=>{
        if(err){
            console.log(err);
        }
    });
},1000);

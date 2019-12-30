const http = require('http'); //http 모듈을 불러온다.

// http.createServer((req,res)=>{
//     //여기에 어떻게 응답할 지 적어줍니다.
//     res.write('<h1>hello Node!</h1>');
//     res.end('<p>Hello Server!</p>');
// });
// }).listen(8080,()=>{
//     console.log('8080번 포트에서 서버 대기 중입니다!');
// });

const server=http.createServer((req,res)=>{
        //여기에 어떻게 응답할 지 적어줍니다.
        res.write('<h1>hello Node!</h1>');
        res.end('<p>Hello Server!</p>');
    });

server.listen(8080);

server.on('listening',()=>{
    console.log('8080번 포트에서 서버 대기 중 입니다.');
});
server.on('error', (error)=>{
    console.error(erro);
});


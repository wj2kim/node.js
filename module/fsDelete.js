const fs = require('fs');

fs.readdir('./folder', (err,dir)=>{
    if(err){
        throw err;
    }
    console.log('폴더 내용 확인', dir);
    fs.unlink('./folder/newfile.js', (err)=>{
        if(err){
            throw err;
        }
        console.log('파일 삭제 성공');
        fs.rmdir('./folder', (err)=>{
            if(err){
                throw err;
            }
            console.log('폴더 삭제 성공');
        });
    });
});

// 노드 8.5 버젼 부터 copyFile 메소드가 추가 됬음.
// 더이상 createReadStream 과 createWriteStream 을 pipe 하지 않아도 

// 노드 10버전부터 fs 모듈을 
// const fsPromises = require('fs').promises; 
// 의 식으로 프로미스 형식으로 사용하는 방법이 추가됨 
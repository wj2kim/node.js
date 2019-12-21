let fs=require('fs');

//동기적 
//readFileSync  
// console.log('A');
// let result=fs.readFileSync('syntax/sample.txt','UTF-8');
// console.log(result);
// console.log('C');
// ABC 순차적으로 실행 됩니다. 

//비동기적(async);
console.log('A');
fs.readFile('syntax/sample.txt','UTF-8', function(err,result){
    console.log(result);
});
console.log('C');
// B의 결과가 나오기 전에 C가 실행 되어서 ACB로 실행 됩니다. 
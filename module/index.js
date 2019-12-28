const checkNumber=require('./func.js');
const {odd, even}=require('./var.js');

console.log(checkNumber(10));

function oddOrEven(str){
    if(str.length%2){
        return odd;
    }else{
        return even;
    }
}

console.log(oddOrEven('hello'));
const {odd, even}=require('./var.js');
// import {odd, even} from './var';

function checkOddOrEven(num){
    if(num%2==1){
        return odd;
    }else{
        return even;
    }
}

module.exports=checkOddOrEven;
// export default checkOddOrEven;

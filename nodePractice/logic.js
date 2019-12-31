//squaredInteger

// const realNumberArray = [4, 5.6, -9.8, 3.14, 42, 6, 8.34, -2];

// const squareList = (arr)=>{
//     // const squaredIntegers = arr.filter(num=>Number.isInteger(num)&&num>0);
//     const squaredIntegers =
//     arr.filter(num=>Number.isInteger(num)&&num>0).map(x=>x*x);
//     return squaredIntegers;
// };

// const squaredIntegers = squareList(realNumberArray);

// console.log(squaredIntegers);

// const increment = (function(){
//     return function increment(number, value = 1){
//         return number + value;
//     };
// })();
// console.log(increment(5,2));
// console.log(increment(5));

let arr = new Array(1,2,3);

//forEach
arr.forEach((item,index)=>{console.log(item,index)});

let doubled = arr.map((item)=>item*2);
console.log(doubled);

console.log(arr.map(function(item){return item}));

console.log(arr.filter((item)=>item%2==0));

console.log(arr.reduce((acc,cur)=>{return acc+cur}),0);


console.log(arr.some((item)=>item<0));

console.log(arr.every((item)=>item>0));

console.log(typeof arr);







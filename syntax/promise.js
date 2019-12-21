// var promise1=new Promise(function(result,reject){
//     setTimeout(function(){
//         result('foo');
//     }, 300);
// });

// promise1.then(function(value){
//     console.log(value);
// });

// console.log(promise1);

const myFirstPromise=new Promise((resolve,reject)=>{
    setTimeout(function(){resolve("Success!")},250);
});;

myFirstPromise.then((successMessage)=>{
    console.log(`성공 : ${successMessage}`)
});

// function myAsyncFunction(url){
//     return new Promise((resolve,reject)=>{
//         const xhr=new XMLHttpRequest();
//         xhr.open("GET",url);
//         xhr.onload=()=>resolve(xhr.responseText);
//         xhr.onerror=()=>reject(xhr.statusText);
//         xhr.send();
//     });
// }


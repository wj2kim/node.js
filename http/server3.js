const http = require('http');

const parseCookies = (cookie='') => cookie.split(';')
.map(v=>v.split('='))
.map(([k, ...vs])=>[k, vs.join('=')])
.reduce((acc,[k,v])=>{
    acc[k.trim()]= decodeURIComponent(v);
    return acc;
},{});

http.createServer((req,res)=>{
    const cookies = parseCookies(req.headers.cookie);
    console.log(req.url, cookies);
    res.writeHead(200,{'Set-cookie': 'mycookie=test'});
    res.end('Hello Cookie');
})
.listen(8082,()=>{
    console.log('8082번 포트에서 서버 대기 중입니다!');
});

// let participant = new Array("mislav", "stanko", "mislav", "ana");
// let completion = new Array("stanko", "ana", "mislav");

// console.log(solution(participant,completion));

// function solution(participant, completion) {
//     participant.sort();
//     completion.sort();

//     for(let i in participant) {
//         if(participant[i] !== completion[i])
//          return participant[i];
//     }
// }



// console.log(new Set(participants));

// for(let i in ps){
//     for(let j in cs){
//         if(cs[j]===ps[i]){
//             break;
//         }else{
//             temp=ps[i];
//         }
//     }
// }

// while(temp!=""){
//     for(let i in ps){
//         if(cs[i]===ps[i]){
//             ps.shift();
//             cs.shift();
//             --i;
//             continue;
//         }else{
//             temp=ps[i];
//         }
//     }
// }
// console.log(temp);


// let difference = participants
//                  .filter(x => !completion.includes(x))
//                  .concat(completion.filter(x => !participants.includes(x)));

// console.log(difference);





//값이 없으면 -1 출력

// let temp=[];
// for (var i in participants){
//     if(completion.indexOf(participants[i])===-1)temp.push(participants[i]);
// }
// console.log(temp);
// let temp="";

// while(cs.length<1){
//     if(cs.indexOf(ps[0])>=0){
//         cs.shift();
//         ps.shift();
//     }else{
//         temp=ps[0];
//     }
// }

// for (var i in ps){
//     if(cs.indexOf(ps[i])>=0){
//         cs.shift();
//         ps.shift();
//     }else if(cs.indexOf(ps[i])<0){
//         temp=ps[i];
//     }
// }
// console.log(temp);



// let incomplete="";

// for(let i=0;i<participants.sort().length;i++){
//     for(let j=0;j<completion.sort().length;j++){
//         if(participants[i]==completion[j]){
//             break;
//         }else{
//             incomplete=participants[i];
//         }
//     }
// }
// console.log(incomplete);
// function arrayDiff(a, b) {
//     return [
//         ...a.filter(x => !b.includes(x)),
//         ...b.filter(x => !a.includes(x))
//     ];
// }


// function arrayDiff(a, b) {
//     return [
//         ...a.filter(x => b.indexOf(x) === -1),
//         ...b.filter(x => a.indexOf(x) === -1)
//     ];
// }
// console.log(arrayDiff(a,b));

// var a = new JS.Set([1,2,3,4,5,6,7,8,9]);
// var b = new JS.Set([2,4,6,8]);

// console.log(a.difference(b));



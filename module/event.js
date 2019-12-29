const EventEmitter = require('events');

//event 모듈을 인스턴스화 함, 이 객체는 이벤트ㅡ 관리를 위한 메소드를 가지고 있음 
const myEvent = new EventEmitter(); 

//on 과 기능이 같다.
myEvent.addListener('event1', ()=>{
    console.log('이벤트 1');
});

//on(이벤트명,콜백) 이벤트 발생 시 콜백을 연결. 
myEvent.on('event2', ()=>{
    console.log('이벤트 2');
});

myEvent.on('event2', ()=>{
    console.log('이벤트 2 추가');
});

// 이벤트를 호출하는 메소드, 이벤트 이름을 인자로 넣어주면 미리 등록해뒀던 이벤트 콜백이 실행됨.
myEvent.emit('event1');
myEvent.emit('event2');

// 한번만 실행되는 이벤트
myEvent.once('event3', ()=>{
    console.log('이벤트 3');
});

// 위에 once 때문에 위에서 콜백이 한번만 실행됨. 
myEvent.emit('event3');
myEvent.emit('event3');

myEvent.on('event4', ()=>{
    console.log('이벤트 4');
});
// 이벤트에 연결된 모든 이벤트 리스너를 제거
myEvent.removeAllListeners('event4');
// event4가 호출되기 전에 리스너를 제거했음으로 event4의 콜백은 호출되지 않는다.
myEvent.emit('event4');
// myEvent.emit('event1');

const listener = () =>{
    console.log('이벤트 5');
};

myEvent.on('event5', listener);
//이벤트에 연결된 리스너를 하나씩 제거 
// myEvent.removeListener('event5',listener);
myEvent.off('event5',listener);
// 리스너를 제거했기에 호출되지 않음.
myEvent.emit('event5');

myEvent.off('event2',listener);
// myEvent.removeAllListeners('event2',listener);
// myEvent.removeListener('event2',listener);
// console.log(myEvent.removeListener('event2',listener()));

// 현재 리스너가 몇 개 연결되어 있는지 확인합니다.
console.log(myEvent.listenerCount('event2'));



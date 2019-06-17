const EventEmitter = require('events');
const emitter = new EventEmitter();


// ############### 1.basic
//event Listener
emitter.on('eventName1',() => {
    console.log(`--------> event Listener called`);
});

//Raise an event
emitter.emit('eventName1');




// ############## 2nd Passing arguments and this to listeners
emitter.on('eventName2',(a,b) => console.log("values",a,b,this)); // 1, 2, {}
emitter.emit('eventName2', '1', '2');


// ################# 3rd asyn event emitter
emitter.on('eventName3',(a,b) => {
    setImmediate(() => {
        console.log('this happens asynchronously');
    });
});
emitter.emit('eventName3','a','b');



// Handlin events only once
let m = 0;
emitter.once('eventName4',() => {
    console.log('only once event',++m);
});
emitter.emit('eventName4'); // Prints: 1
emitter.emit('eventName4'); // Ignored




//Error events

emitter.on('errorEvent',(err) => {
    console.error('whoops! there was an error');
});
emitter.emit('errorEvent',new Error('whoops!'));
// Prints: whoops! there was an error



//newListener
emitter.once('newListener',(event,listener) => {
    if(event === 'eventName5'){
        // Insert a new listener in front
        emitter.on("eventName5", () => console.log('A'));
    }
});

emitter.on('eventName5',() => {
    console.log('B');
});
emitter.emit('eventName5');




//remove event listener
function pong() {
    console.log('pong');
}

emitter.on('ping',pong);
emitter.removeListener('ping',pong);
emitter.once('ping',pong); // it won't execute

emitter.emit('ping');
emitter.emit('ping');





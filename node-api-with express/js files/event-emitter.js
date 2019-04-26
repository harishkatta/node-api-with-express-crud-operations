const EventEmitter = require('events');
const myEE = new EventEmitter();

const eventsList = {
    GREET: 'greet'
}
myEE.on(eventsList.GREET, () => {
    console.log('Some where some one said Hello');
})
myEE.on(eventsList.GREET, () => {
    console.log('Welcome to Event emitter');
})
console.log('hello');
myEE.emit(eventsList.GREET);
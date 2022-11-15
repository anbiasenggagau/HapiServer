const { EventEmitter } = require('events')// TODO 1
 
const birthdayEventListener = (name, date) => {
  console.log(`Happy birthday ${name}! on ${date}`);
}
 
// TODO 2
const myEmiter = new EventEmitter()
 
// TODO 3
 myEmiter.on('birthday', birthdayEventListener)

// TODO 4
myEmiter.emit('birthday', 'Anbia', '31 Oct 2022')
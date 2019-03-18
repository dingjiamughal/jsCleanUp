const EventEmitter = require('events');
const util = require('util');

// class Bell extends EventEmitter {}
function Bell() {
    EventEmitter.call(this);
}

util.inherits(Bell, EventEmitter);

const bell = new Bell();

function startLesson(roomNum, a) {
    console.log(`上课，在${roomNum}${a}教室`);
}

function teacher(roomNum) {
    console.log(`老师进教室，在${roomNum}教室`);
}

bell.addListener('call', startLesson);
bell.on('call', teacher);

bell.emit('call', 301, 'daf');

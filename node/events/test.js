const EventEmitter = require('./events');
const bell = new EventEmitter();

function startLesson(roomNum, a) {
    console.log(`上课，在${roomNum},${a}教室`);
}

function teacher(roomNum) {
    console.log(`老师进教室，在${roomNum}教室`);
}

function gohome() {
    console.log('放学回家');
}

function gotoSchool() {
    console.log('上学');
}
// bell.on('call', startLesson);
// bell.on('call', teacher);
// bell.once('gohome', gohome);
bell.on('gohome', gotoSchool);
bell.on('gohome', gotoSchool);
bell.on('gohome', gotoSchool);
bell.on('gohome', gotoSchool);
bell.on('gohome', gotoSchool);
bell.on('gohome', gotoSchool);
// bell.emit('call', 301, 'daf');
// bell.emit('call', 333, 'aaa');
bell.emit('gohome');

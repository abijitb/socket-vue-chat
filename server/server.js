var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var moment = require('moment');


server.listen(3000);

io.on('connection', function (socket) {
    socket.on('user_1', function (data) {
        io.emit('user_1', data);
        let message = '';
        let str = data.msg.toLocaleLowerCase();
        str = str.trim();
        switch (str) {
            case 'hi':
                message = 'Hey.';
                break;
            case 'hey':
                message = 'Hey.';
                break;
            case 'how are you?':
                message = 'I am good. You?';
                break;
            case 'how are u?':
                message = 'I am good. You?';
                break;
            case 'how r you?':
                message = 'I am good. You?';
                break;
            case 'how r u?':
                message = 'I am good. You?';
                break;
            case 'fine':
                message = 'Great.';
                break;
            default:
                message = 'This is an auto generated message. You can add another user to chat properly.';
        }
        setTimeout(() => {
            io.emit('user_2', {
                user: 2,
                name: 'Natasha',
                date: moment().format('MMMM Do YYYY, h:mm a'),
                msg: message
            });
        }, 500);
    });
    socket.emit('user', {
        user: 2,
        name: 'Natasha',
        image: 'https://pbs.twimg.com/profile_images/1081059819602112513/Tkidkd4M_400x400.jpg',
    });
});
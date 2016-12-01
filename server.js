var app = require("express")();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require("socket.io")(http);

var userModel = require('./model/user');
userModel = new userModel();

app.use(require("express").static('data'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, *');
    
    next();
});

app.get("/", function (req, res) {
    res.json("Welcome messenger server");
//    res.sendFile(__dirname + '/index.html');
});

app.get("/users-list", function (req, res) {
    var users = userModel.list();
    res.json(users);
});

app.post("/login", function (req, res) {
    
    var username = req.body.username,
    password = req.body.password
    
    var user = userModel.findByUsername(username, password);
    
    if(user){
        res.json({data:user});
    }else{
        res.json({error:1, msg:'Invalid username or password'});
    }
    
});


// creating array of users.
var users = [];

// This is auto initiated event when Client connects to Your Machien.  
io.on('connection', function (socket) {

    //Storing users into array as an object
    socket.on('userLogin', function (userId) {
        var user = userModel.find(userId)
        user.socket = socket.id;

        // fire the connected user
        io.emit('userConnected', user);
    });

    //Sending message to Specific user
    socket.on('send_msg', function (data_server) {
//        console.log('send_msg', data_server);

        if (data_server.to && data_server.to.socket) {
            socket.broadcast.to(data_server.to.socket).emit('get msg', data_server);
        }
    });

    //Removig user when user left the chatroom
    socket.on('disconnect', function () {

        var user = userModel.findBySocket(socket.id);
        
        if(user && user.socket){
            user.socket = null;
        }
        
        io.emit('exit', socket.id);
    });
});


http.listen(3000, function () {
    console.log("Listening on 3000");
});

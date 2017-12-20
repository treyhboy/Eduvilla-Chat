const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const bp = require('body-parser');
const db = require('./userdata').chats;
const userdata = require('./userdata').mydata;
const db1 = require('./db').todo;
const app = express();
 const server = http.Server(app);
 const io = socketio(server);

app.use('/', express.static(__dirname + "/public_static"));

io.on('connection', (socket) => {
    console.log("New client connected");

    socket.on('new_message', (data) => {
        userdata.findAll({where:{sid:socket.id}}).then(function (name) {
         db.create({
            chat:data,
            sid:socket.id,
            username:name[0].username
        }).then(function () {
            let sen = {chat:data,username:name[0].username}
            io.emit('recv_message', sen)
        }).catch(function(err)
        {
            throw err;
        });
        });

  })
    socket.on('name', (data) => {
        userdata.findOne({where:{username:data.name}}).then(function (dab) {
           if(dab) {
                db.update({sid:socket.id},{where:{username:data.name}}).then(function () {
                    console.log('success');

                })
                userdata.update({sid:socket.id},{where:{username:data.name}}).then(function () {
                    console.log('success');

                })
                db.findAll().then(function (chat) {
                    io.emit('getname', chat);
                })
            }
                else
                {   console.log(data.name);
                    console.log(data.pass);
                    userdata.create({
                    username:data.name,
                    pass:data.pass,
                    sid:socket.id
                })
                }
            })
        })
    })

app.use(bp.urlencoded({extended: true}))
app.use(bp.json())

app.get('/todo', (req,res) => {
    db1.findAll().then(function (db1) {
        res.send(db1);
    }).catch(function (err) {
        console.log('error');
        res.send({error: "Could not retrieve todos"})
    })
})

app.post('/todo',(req,res) => {
    db1.create({
        task:req.body.task,
        value:req.body.value
    }).then(function () {
        res.send({success:true})
    }).catch(function(err)
    {
        throw err;
    });
})
app.post('/todos',(req,res)=>{

    db1.destroy({
        where:{
            id:req.body.id
        }
    }).then(function () {
        res.send({success:true})
    }).catch(function (err) {
        throw err;
    });
})
app.post('/set',(req,res)=>{

    db1.update({task:req.body.task},{where:{id:req.body.id}}).then(function () {
        res.send({success:true})
    }).catch(function (err) {
        throw err;
    });
})

app.post('/val',(req,res)=>{
    console.log(req.body.value)
    console.log(req.body.id)
    db1.update({value:req.body.value},{where:{id:req.body.id}}).then(function () {
        //console.log(req.body.value);
        res.send({success:true})
    }).catch(function (err) {

        throw err;
    });
})

server.listen(3245, function () {
    console.log("Server started on http://localhost:3245");
});

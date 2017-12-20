let socket = io();
$(function () {

    let newmsg = $('#newmsg')
    let send = $('#send')
    let msglist = $('#msglist')
    let name = $('#name');
    let pass = $('#pass');
    let jum = $('#jumpin')
    retrievedata();
    newmsg.keydown(function (ev) {
        var key=ev.which;
        if(key === 13)
        {
            console.log('calling ');
            socket.emit('new_message', newmsg.val())
            console.log('called');
        }
    })
    jum.click(function() {
        $('.box').css('display','none');
        $('.main').css('display','block');
        $('.footer').css('display','block');
        sessionStorage.setItem('login',name.val());
        console.log(pass.val())
        socket.emit('name',{name:name.val(),pass:pass.val()});
    });
    send.click(function () {
        socket.emit('new_message', newmsg.val())
        newmsg.innerHTML = '' ;
    })
    socket.on('getname',(data) =>{
        if(data) {
            for (ch of data) {

                if(ch.username === sessionStorage.getItem('login'))
                {let list = $(`<div class="message">
					<li style="list-style-type: none;"><strong>${ch.username}</strong>:${ch.chat}</li></div> `)
                }
                else
                {let list = $(`<div class="message right">
              <li style="list-style-type: none;"><strong>${ch.username}</strong>:${ch.chat}</li></div> `)
                }
                msglist.append(list);
            }
            //localStorage.setItem("todolis",JSON.stringify(data));
        }

    })
    socket.on('recv_message', (data) => {
        console.log(data.chat);
        if(data.username === sessionStorage.getItem('login'))
        { msglist.append($(`<div class="message right">
              <li style="list-style-type: none;"><strong>${data.username}</strong>:${data.chat}</li></div> `))
        }
        else {
            msglist.append($(`<div class="message">
            <li style="list-style-type: none;"><strong>${data.username}</strong>:${data.chat}</li></div>`))
        }
    })
})

function retrievedata() {
    let data = sessionStorage.getItem('login');
    console.log('retrievedata called');
    if(data) {
        $('.box').css('display','none');
        $('.main').css('display','block');
        $('.footer').css('display','block');
        let x = data;
        socket.emit('name',x);
    }
}
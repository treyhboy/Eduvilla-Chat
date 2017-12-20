
// /**
//  * Created by championswimmer on 14/07/17.
//  */
//
// let socket = io();
// $(function () {
//
//     let newmsg = $('#newmsg')
//     let send = $('#send')
//     let msglist = $('#msglist')
//     let startup = $('#startup');
//     let name = $('#name');
//     let pass = $('#pass');
//     retrievedata();
//     newmsg.keydown(function (ev) {
//         var key=ev.which;
//         if(key === 13)
//         {
//            console.log('calling ');
//            socket.emit('new_message', newmsg.val())
//             console.log('called');
//         }
//     })
//     startup.click(function () {
//         $('#chatcont').show();
//         $('#but').show();
//          $('#pic').hide();
//         $('#login').hide();
//         sessionStorage.setItem('login',name.val());
//         console.log(pass.val())
//         socket.emit('name',{name:name.val(),pass:pass.val()});
//     })
//   send.click(function () {
//       socket.emit('new_message', newmsg.val())
//   })
//     socket.on('getname',(data) =>{
//         if(data) {
//             for (ch of data) {
//
//                 if(ch.username === sessionStorage.getItem('login'))
//                 {let list = $(`<div class="alert alert-success" role="alert">
//               <li><strong>${ch.username}</strong>:${ch.chat}</li></div> `)
//                }
//                else
//                 {let list = $(`<div class="alert alert-success" style="text-align: right" role="alert">
//               <li  ><strong>${ch.username}</strong>:${ch.chat}</li></div> `)
//                 }
//                 msglist.append(list);
//             }
//             //localStorage.setItem("todolis",JSON.stringify(data));
//         }
//
//     })
//     socket.on('recv_message', (data) => {
//         console.log(data.chat);
//         if(ch.username === sessionStorage.getItem('login'))
//         { msglist.append(list)($(`<div class="alert alert-success" role="alert">
//               <li ><strong>${data.username}</strong>:${data.chat}</li></div> `))
//            }
//         else {
//             msglist.append($(`<div class="alert alert-success" style="text-align: right" role="alert">
//             <li ><strong>${data.username}</strong>:${data.chat}</li></div>`))
//         }
//     })
// })
// function retrievedata() {
//     let data = sessionStorage.getItem('login');
//     console.log('retrievedata called');
//     if(data) {
//
//         $('#chatcont').show();
//         $('#but').show();
//         $('#pic').hide();
//         $('#login').hide();
//         let x = data;
//         socket.emit('name',x);
//     }
// }

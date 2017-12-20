/**
 * Created by tarun on 13/7/17.
 */
$(function () {
    let newtodo = $('#newtodo');
    let addbtn = $('#addbtn');
    let list = $('#list');
    let del = $('#deletebtn')

    refreshtodo();

    function refreshtodo() {
        list.empty();
        var arr = [];
        $.get('/todo', function (data) {
            console.log(data);
// arr.push(data[0]);

// console.log("logging data")
//             console.log(data)
            for (todo of data) {
                let todoItem = $('<li>');
                todoItem.attr('class', 'list-group-item');
                todoItem.attr('id', todo.id);
                let checkbox = $('<input type="checkbox">');
                checkbox.attr('class', 'col-1').attr('checked', todo.value);
                checkbox.click(function (ev) {
                    ev.preventDefault();
                    // console.log(todo);
                    // console.log(todo.value)
                    let va = !todo.value;
                    console.log(va + " " + $(ev.target).parent().attr('id'));
                    $.post('/val', {value: va, id: $(ev.target).parent().attr('id')}, function (data2) {
                        if (data2.success) {
                            console.log('success');
                            refreshtodo();
                        }
                        else {
                            console.log('no success');
                        }
                    })
                })
                todoItem.append(checkbox);
                todoItem.append($(`<span>${todo.task}</span>`));

                todoItem.append($(`<i  class="ion-close-circled"></i>`)
                    .click(function (ev) {
                        //console.log('click');
                        console.log($(ev.target).parent().attr('id'));
                        $.post('/todos', {id: $(ev.target).parent().attr('id')}, function (data2) {
                            if (data2.success) {
                                refreshtodo();
                            }

                        })
                    }))

                todoItem.append($('<i class="ion-chevron-up col-1 icn-move"></i>')
                    .click(function (ev) {
                        let save = $(ev.target).parent().children(1).text();
                        $.post('/set', {
                            id: $(ev.target).parent().attr('id'),
                            task: $(ev.target).parent().prev().children(1).text()
                        }, function (data2) {
                            if (data2.success) {
                                refreshtodo();
                            }

                        })
                        $.post('/set', {id: $(ev.target).parent().prev().attr('id'), task: save}, function (data2) {
                            if (data2.success) {
                                refreshtodo();
                            }

                        })

                    }))

                todoItem.append($('<i class="ion-chevron-down col-1 icn-move"></i>')
                    .click(function (ev) {
                        let save = $(ev.target).parent().children(1).text();
                        $.post('/set', {
                            id: $(ev.target).parent().attr('id'),
                            task: $(ev.target).parent().next().children(1).text()
                        }, function (data) {
                            if (data.success) {
                                refreshtodo();
                            }

                        })
                        $.post('/set', {id: $(ev.target).parent().next().attr('id'), task: save}, function (data) {
                            if (data.success) {
                                refreshtodo();
                            }

                        })

                    }))

                list.append(todoItem);

            }

        })
        // console.log(arr[0]);
    }

    function gettodo() {
        var arr = [];
        let checked = [];
        $.get('/todo', function (data) {

            for (i of data) {
                arr.push(i);
            }
            for (todo of arr) {
                if (todo.value) {
                    checked.push(todo.id)
                }
            }


        });

    }

    addbtn.click(function () {
        $.post('/todo', {task: newtodo.val(), value: false}, function (data) {
            if (data.success) {
                refreshtodo();
            }
        })
    })
    del.click(function () {
        $.post('/set', function (data) {
            if (data.success) {
                refreshtodo();
            }

        })

    })
})
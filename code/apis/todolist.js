// fetch from https://raw.githubusercontent.com/choccymilku/choccy-newer-and-improved/main/todo.md, then split by \n

fetch('https://raw.githubusercontent.com/choccymilku/choccy-newer-and-improved/main/todo.md')
    .then(response => response.text())
    .then(text => {
        var todo = text.split('\n');
        var todo_list = document.getElementById('todo_list');
        todo.forEach((item) => {
            if (item.trim() !== '') {
                var todo_item = document.createElement('li');
                todo_item.textContent = item;
                todo_list.appendChild(todo_item);
            }
        });
    });

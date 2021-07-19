function onPageLoaded(){
    const saveButton = document.querySelector('button.save');
    const clearButton = document.querySelector('button.clear');
    const showTipsButton = document.querySelector('button.showTips');
    const closeTipsButton = document.querySelector('a.closeTips');
    const overlay = document.querySelector('#overlay'); 

    saveButton.addEventListener('click', () => {
        localStorage.setItem('todos', ul.innerHTML);
    });

    clearButton.addEventListener('click', () => {
        ul.innerHTML = '';
        localStorage.removeItem('todos', ul.innerHTML);
    });

    showTipsButton.addEventListener('click', () => {
        overlay.style.height = '100%';
    });

    closeTipsButton.addEventListener('click', () => {
        overlay.style.height = '0';
    });

    const input = document.querySelector("input[type='text']");
    const ul = document.querySelector("ul.todos");

    function createTodo() {
        const li = document.createElement('li');
        const textSpan = document.createElement('span');
        textSpan.classList.add('todo-text');
        const newTodo = input.value;
        textSpan.append(newTodo);

        const deleteBtn = document.createElement('span');
        deleteBtn.classList.add('todo-trash');
        const icon = document.createElement('i');
        icon.classList.add('fas', 'fa-trash-alt');
        deleteBtn.appendChild(icon);

        ul.appendChild(li).append(textSpan, deleteBtn);
        input.value = '';
        listenDeleteTodo(deleteBtn);
        
    };

    function listenDeleteTodo(element) {
        element.addEventListener('click', (event) =>{
            element.parentElement.remove();
            element.stopPropagation();
        });
    };

    function loadTodos() {
        const data = localStorage.getItem('todos');
        if(data){
            ul.innerHTML= data;
            const deleteButtons = document.querySelectorAll('span.todo-trash');
            for (const button of deleteButtons){
                listenDeleteTodo(button)
            }
        }
    }

    function onClickTodo(event){
        if (event.target.tagName === 'LI'){
            event.target.classList.toggle('checked');
        }
    }

    input.addEventListener('keypress', (keyPressed)=> {
        // каждая клавиша на клавиатуре имеет предопределенный код - 13 соответствует клавише "Enter"( сайт для определения "keycode.info")
        const keyEnter = 13;
        if(keyPressed.wich === keyEnter){
            createTodo();
        }
    });

    ul.addEventListener('click', onClickTodo);

    loadTodos();
}

document.addEventListener('DOMContentLoaded', onPageLoaded);
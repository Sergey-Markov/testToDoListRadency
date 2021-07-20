// import "bootstrap-icons/font/bootstrap-icons.css";
const refs = {
     saveButton : document.querySelector('.save'),
     clearButton : document.querySelector('.clear'),
     showTipsButton : document.querySelector('.showTips'),
     closeTipsButton : document.querySelector('.closeTips'),
     overlay : document.querySelector('#overlay'), 
     input : document.querySelector('.inputRow'),
     ul : document.querySelector('ul.todos'),
};

console.log(refs.ul.innerHTML);



function onPageLoaded(){
    

    refs.saveButton.addEventListener('click', () => {
        console.log(refs.ul.innerHTML);
        localStorage.setItem('todos', refs.ul.innerHTML);
    });

    refs.clearButton.addEventListener('click', () => {
        refs.ul.innerHTML = '';
        localStorage.removeItem('todos', refs.ul.innerHTML);
    });

    refs.showTipsButton.addEventListener('click', () => {
        refs.overlay.style.height = '100%';
    });

    refs.closeTipsButton.addEventListener('click', () => {
        refs.overlay.style.height = '0';
    });

    

    function createTodo() {
        const li = document.createElement('li');
        const textSpan = document.createElement('span');
        textSpan.classList.add('todo-text');
        const newTodo = refs.input.value;
        textSpan.append(newTodo);

        const deleteBtn = document.createElement('span');
        deleteBtn.classList.add('todo-trash');
        const icon = document.createElement('i');
        icon.classList.add('bi', 'bi-trash');
        deleteBtn.appendChild(icon);

        refs.ul.appendChild(li).append(textSpan, deleteBtn);
        refs.input.value = '';
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
            refs.ul.innerHTML= data;
            const deleteButtons = document.querySelectorAll('span.todo-trash');
            for (const button of deleteButtons){
                listenDeleteTodo(button)
            }
        }
    }

    function onClickTodo(event){
        if (event.target.tagName === 'LI' || event.target.tagName === 'SPAN'){
            event.target.classList.toggle('checked');
        };
    };

    refs.input.addEventListener('keypress', (keyPressed)=> {
        // каждая клавиша на клавиатуре имеет предопределенный код - 13 соответствует клавише "Enter"( сайт для определения "keycode.info")
        const keyEnter = 13;
        if(keyPressed.key === 'Enter'){
            createTodo();
        }
        setTimeout(() => {
            localStorage.setItem('todos', refs.ul.innerHTML);
        }, 300);
    });

    refs.ul.addEventListener('click', onClickTodo);

    loadTodos();
}

document.addEventListener('DOMContentLoaded', onPageLoaded);
// document.addEventListener('click', (event) => {
//     const keyName = event.target;
  
//     console.dir(keyName.className);
//   });
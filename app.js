// SELECTORS
let ul = document.querySelector(".projects");
let input = document.getElementById('input');
const dropdown = document.querySelector(".dropdown")
html = ``;

//windows eventlistener to check local storage
window.onload = gettodo();


// submit button function to add task
document.getElementById("submit").addEventListener('click', function(){
    event.preventDefault();
    
    //create li 
    const li= document.createElement('li');
    li.className = "todo";

    //create todo
    const a= document.createElement('a');
    a.className = 'todos';
    html = `${input.value}`;
    a.innerHTML = html;

    //add todo to local storage
    savingtodo(input.value);

    //create del button
    const btn = document.createElement('button');
    btn.innerHTML= `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                        </svg>`;
    btn.className = "delete ";
    
    // appending children
    li.appendChild(a);
    li.appendChild(btn);
    
    //append in ul
    ul.appendChild(li);

    // refreshing the form
    input.value='';
    return false;
});

// delete and checkmarking todos
ul.addEventListener('click', function(e){
    const item = e.target;
   
    //DELETE THEM
    if( item.classList[0] === 'delete'){
        item.parentElement.remove();
        let delitem=JSON.parse( localStorage.getItem('todos'));
        delitem.forEach(element => {
            if(element == item.parentElement.firstElementChild.innerHTML){
                delitem.splice(delitem.indexOf(element),1);
                localStorage.setItem('todos', JSON.stringify(delitem))
            }
        });
    }
     
    //CHECKMARK THEM
    if( item.classList[0] === 'todos'){
        item.classList.toggle('completed');
        //moving completed tasks to dropdown menu
        dropdown.appendChild(item.parentElement);
    }
});


//dropdown opener for completed tasks
function dropdowne(){
    dropdown.classList.toggle('open');
}

//function to retrive or del todos in dropwdown
dropdown.addEventListener('click', function(e){
    const item = e.target;

    //deleting finally
    if( item.classList[0] === 'delete'){
        item.parentElement.remove();
        dropdown.classList.toggle('open');
    }

    //uncheck them back
    if( item.classList[0] === 'todos'){
        item.classList.toggle('completed');
        //moving completed tasks to dropdown menu
        ul.appendChild(item.parentElement);
        dropdown.classList.toggle('open');
    }
})

//function to save todos in localestorage
function savingtodo(todo){
    let todos;
    if(localStorage.getItem('todos')== null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

//get back from storage
function gettodo(){
    let todos;
    if(localStorage.getItem('todos')== null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(todo => {
    
    
    //create li 
    const li= document.createElement('li');
    li.className = "todo";

    //create todo
    const a= document.createElement('a');
    a.className = 'todos';
    html = `${todo}`;
    a.innerHTML = html;

    //create del button
    const btn = document.createElement('button');
    btn.innerHTML= `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                        </svg>`;
    btn.className = "delete ";
    
    // appending children
    li.appendChild(a);
    li.appendChild(btn);
    
    //append in ul
    ul.appendChild(li);
    });
}
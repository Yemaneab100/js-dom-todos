
const todosListUL = document.querySelector("#todo-list");
const formTodo = document.querySelector('form');
 // the endpoint to GET ALL todos
 const uri = "http://localhost:3000/todos";

formTodo.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(formTodo);
    const data = Object.fromEntries(formData);
  

    fetch(uri, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
      .catch(error => console.log(error));
   
      loadTodos()    
});

// local state in the browser
const state = {
    todos: [],
  }; 
  
  // RENDERING
  function renderTodos() {
    // clear the existing todos
    todosListUL.innerHTML = "";
    // render them again
    createTodoLists()
  }

  // creat appropraite List
  function createTodoLists(){
    state.todos.forEach((todo) => {
      const li = document.createElement("li");
      const btnDelete = document.createElement('button');
      btnDelete.innerText = "Delete";
      btnDelete.classList.add('delete')
      

      if(todo.completed){
        const del = document.createElement('del');
        li.setAttribute('style', 'color:grey;')
        del.innerText = todo.title
        li.appendChild(del);
      }

      else{
        li.innerText = todo.title
        const btnComplete = document.createElement('button');
        btnComplete.innerText = "Complete"
        btnComplete.classList.add('complete')
        li.appendChild(btnComplete);

        btnComplete.addEventListener('click', () =>{
          updateTodos(todo)
        })
        
      }

      btnDelete.addEventListener('click',() => {
        deletTodos(todo)
        
      })

      li.appendChild(btnDelete);
      todosListUL.appendChild(li); 
     
    });
  }
  // update complete 

  function updateTodos(todo){
    fetch(`${uri}/${todo.id}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "title": todo.title,
        "completed": true
      })
  }).then(res => res.json())
  location.reload() 
  .catch(error => console.log(error));

  }

  // Delete todos
  function deletTodos(todo){
    fetch(`${uri}/${todo.id}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
      }  
  }).then(res => res.json())
    .catch(error => console.log(error));

  location.reload();
  }
  
  // GET ALL todos
function loadTodos() {
    console.log("Todo: GET todos/ from server");

    // default is to send GET request, so I don't need any options
    fetch(uri)
      .then((response) => {
        // here I got my response from the server
        // extract the JSON from the response
        // and convert into a JS object, returning this object
        return response.json();
      })
      .then((todos) => {
        // here I have extracted the data from my response so that I can use it
        console.log("Got todos:", todos);
        console.log("Saving todos in local state");
        state.todos = todos;
        console.log("Todo: render todos in HTML");
        renderTodos();
      });
  }
  
  loadTodos();
  
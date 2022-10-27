
const todosListUL = document.querySelector("#todo-list");
const formTodo = document.querySelector('form');


formTodo.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(formTodo);
    const data = Object.fromEntries(formData);
    const uri = "http://localhost:3000/todos";

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

// const inputTodo = document.querySelector('input');
// inputTodo.addEventListener('click', () => {
//     loadTodos();
// })


// local state in the browser
const state = {
    todos: [],
  }; 
  
  // RENDERING
  function renderTodos() {
    // clear the existing todos
    todosListUL.innerHTML = "";
    // render them again
    state.todos.forEach((todo) => {
      const li = document.createElement("li");
      if(todo.completed){
        // style="color:red;"
        // <del>blue</del>
        const del = document.createElement('del');
        li.setAttribute('style', 'color:grey;')
        del.innerText = todo.title
        li.appendChild(del);
      }

      else{
        li.innerText = todo.title
      }
      
      todosListUL.appendChild(li);
    });
  }

  
  // GET ALL todos
function loadTodos() {
    console.log("Todo: GET todos/ from server");
  
    // the endpoint to GET ALL todos
    const uri = "http://localhost:3000/todos";
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
  
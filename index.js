const toDoList = document.querySelector('#todo-list')

const state = {
   thingsToDo : []

}

function renderToDoList (){
    toDoList.innerHTML = "";
 
    state.thingsToDo.forEach((task) => {
    const li = document.createElement("li")
    li.innerText = task.title 
    toDoList.appendChild(li)

  });
}

function loadToDoList() {

    const uri = "http://localhost:3000/todos"
   
    fetch(uri)
      .then((response) => {

        return response.json()
      })
      .then((task) => {

        state.thingsToDo = task
        renderToDoList()

      });
  }

  loadToDoList()